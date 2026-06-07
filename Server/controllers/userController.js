const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { Users } = require('../models/models')

const generateAccessToken = (id, role) => {
    return jwt.sign(
        { id,  role },
        process.env.SECRET_KEY,
        { expiresIn: '15m' }
    )
}

const generateRefreshToken = (id) => {
    return jwt.sign(
        { id },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: '30d' }
    )
} 

class UserController {
    async registration(req, res, next) {
        const { name, password, email, role } = req.body

        const candidate = await Users.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        let avatarName = null

        if (req.files && req.files.avatar) {
            const { avatar } = req.files
            const ext = avatar.name.split('.').pop()
            avatarName = uuid.v4() + "." + ext
            const staticPath = path.resolve(__dirname, '..', 'static/images')
            
            await avatar.mv(path.join(staticPath, avatarName))
        }

        const userData = {
            name,
            password: hashPassword,
            email,
            role: role || 'Пользователь',
            avatar: avatarName
        }

        const user = await Users.create(userData)

        const accessToken = generateAccessToken(user.id, user.role)
        const refreshToken = generateRefreshToken(user.id)

        await user.update({ refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'lax',
            secure: false, // Случай для dev режима
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.json({ accessToken })
    }

    async login(req, res, next) {
        const { email, password } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) return next(ApiError.badRequest('Пользователь не найден'))

        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) return next(ApiError.badRequest('Неверный пароль'))

        const accessToken = generateAccessToken(user.id, user.role)
        const refreshToken = generateRefreshToken(user.id)

        await user.update({ refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'lax',
            //secure: false, // Случай для dev режима
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.json({ accessToken })
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies

            if (!refreshToken)
                return res.status(401).json({ message: 'Не авторизован' })

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)

            const user = await Users.findByPk(decoded.id)

            if (!user || user.refreshToken !== refreshToken)
                return res.status(401).json({ message: 'Не авторизован' })

            const newAccessToken = generateAccessToken(user.id, user.role)

            return res.json({ accessToken: newAccessToken })
        } catch (e) {
            return res.status(401).json({ message: 'Не авторизован' })
        }
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies

        if (refreshToken) {
            const user = await Users.findOne({ where: { refreshToken } })
            if (user) await user.update({ refreshToken: null })
        }

        res.clearCookie('refreshToken')

        return res.json({ message: 'Выход выполнен' })
    }

    async changePassword(req, res, next) {
        try {
            const { email, newPassword } = req.body

            const user = await Users.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }

            const hashPassword = await bcrypt.hash(newPassword, 5)

            await user.update({ password: hashPassword })

            return res.json({ message: 'Пароль успешно обновлён' })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res, next) {
        try {
            const { id, deleteAvatar, name, email } = req.body

            const user = await Users.findOne({ where: { id } })

            let avatarName = user.avatar
            const staticPath = path.resolve(__dirname, '..', 'static/images')

            if (deleteAvatar === "true") {
                if (user.avatar) {
                    const filePath = path.join(staticPath, user.avatar)

                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath)
                    }
                }

                avatarName = null
            }

            if (req.files && req.files.avatar) {

                if (user.avatar) {
                    const oldPath = path.join(staticPath, user.avatar)
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath)
                    }
                }
            
                const avatar = req.files.avatar
                const ext = avatar.name.split('.').pop()
                avatarName = uuid.v4() + "." + ext

                await avatar.mv(path.join(staticPath, avatarName))
            }

            await user.update({ name: name, email: email, avatar: avatarName })

            return res.json({ name: name, email: email, avatar: avatarName })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async editPassword(req, res, next) {
        try {
            const { id, newPassword } = req.body

            // 1. Проверка: передан ли новый пароль
            if (!newPassword) {
                return next(ApiError.badRequest('Поле newPassword не заполнено'))
            }

            // 2. Поиск пользователя
            const user = await Users.findOne({ where: { id } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким ID не найден'))
            }

            // 3. Хеширование (теперь newPassword точно есть)
            const hashPassword = await bcrypt.hash(newPassword, 5)

            await user.update({ password: hashPassword })

            return res.json({ message: "Пароль успешно обновлён" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getInfo(req, res, next) {
        try {
            const { id } = req.params
            const user = await Users.findOne({
                where: { id },
                attributes: ['name', 'email', 'avatar']
            })

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }

            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()