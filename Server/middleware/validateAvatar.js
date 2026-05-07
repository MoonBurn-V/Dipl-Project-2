const ApiError = require('../error/ApiError')

module.exports = (req, res, next) => {
    if (!req.files || !req.files.avatar) {
        return next()
    }

    const avatar = req.files.avatar

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ]

    const maxSize = 2 * 1024 * 1024

    const allowedExt = ['jpg', 'jpeg', 'png', 'webp']
    const ext = avatar.name.split('.').pop().toLowerCase()

    if (!allowedExt.includes(ext)) {
        return next(ApiError.badRequest('Недопустимый формат файла'))
    }

    if (!allowedTypes.includes(avatar.mimetype)) {
        return next(ApiError.badRequest('Аватар должен быть JPG, PNG или WEBP'))
    }

    if (avatar.size > maxSize) {
        return next(ApiError.badRequest('Размер аватара не должен превышать 2MB'))
    }

    next()
}