const { Courses } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

const { Op } = require('sequelize')

class CourseController {

    async create(req, res, next) {
        try {
            const { 
                title, 
                price, 
                difficulty, 
                type, 
                description, 
                mini_description, 
                number_lessons = 0, 
                rating = 4.50, 
                status = "В разработке", 
                created_date,
                creator_id
            } = req.body

            if (!title || !description || !mini_description || !difficulty || !type || !creator_id) {
                return next(ApiError.badRequest('Не заполнены обязательные поля курса'))
            }
            
            let fileName = null
            
            if (req.files && req.files.image) {
                const { image } = req.files
                fileName = uuid.v4() + ".jpg"
                
                const staticPath = path.resolve(__dirname, '..', 'static/images')
                
                await image.mv(path.resolve(staticPath, fileName))
            }
            
            const courseData = {
                title,
                price: price === '' ? null : parseFloat(price),
                difficulty,
                type,
                description,
                mini_description,
                number_lessons: parseInt(number_lessons) || 0,
                rating: rating === '' ? 0 : parseFloat(rating),
                status: status || 'В разработке',
                created_date: created_date || new Date(),
                image: fileName,
                creator_id
            }
            
            const course = await Courses.create(courseData)
            
            return res.json(course)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const where = {}

            let { limit, page } = req.query
            const { search } = req.query

            limit = limit || 9
            page = page || 1
            let offset = page * limit - limit

            if (!req.query.status) {
                where.status = 'Готов'
            }

            const allowedFilters = [
                'difficulty',
                'type',
                'rating',
                'status',
                'creator_id'
            ]

            allowedFilters.forEach(field => {
                if (req.query[field]) {
                    where[field] = req.query[field]
                }
            })

            const { minPrice, maxPrice } = req.query

            if (minPrice || maxPrice) {
                where.price = {
                    [Op.not]: null
                }

                if (minPrice) {
                    where.price[Op.gte] = Number(minPrice)
                }

                if (maxPrice) {
                    where.price[Op.lte] = Number(maxPrice)
                }
            }

            if (req.query.priceIsNull === 'true') {
                where.price = null
            }

            if (search) {
                where.title = {
                    [Op.iLike]: `%${search}%`
                }
            }

            const allowedSortFields = [
                'price',
                'rating',
                'created_date',
                'title'
            ]

            let order = []

            if (req.query.sort && allowedSortFields.includes(req.query.sort)) {
                order = [[
                    req.query.sort,
                    req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
                ]]
            }

            if ((minPrice || maxPrice)) {
                order = [['price', 'ASC']]
            }

            const courses = await Courses.findAndCountAll({
                where,
                order,
                limit,
                offset
            })

            return res.json(courses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const course = await Courses.findOne({ where: {id} })
        return res.json(course)
    }

    async finishCourse(req, res, next) {
        try {
            const { id } = req.params
            const userId = req.user?.id

            if (!userId) {
                return next(ApiError.unauthorized('Не авторизован'))
            }

            if (!id) {
                return next(ApiError.badRequest('ID курса не предоставлен'))
            }

            // Найти курс и проверить, что пользователь - создатель
            const course = await Courses.findOne({ where: { id } })
            
            if (!course) {
                return next(ApiError.notFound('Курс не найден'))
            }

            if (course.creator_id !== userId) {
                return next(ApiError.forbidden('Только создатель курса может завершить создание'))
            }

            // Обновить статус курса на 'Готов'
            await course.update({ status: 'Готов' })

            // Обновить статус всех уроков курса на 'Готов'
            const { Lessons } = require('../models/models')
            await Lessons.update(
                { status: 'Готов' },
                { where: { course_id: id } }
            )

            return res.json({ 
                message: 'Курс успешно завершен',
                course: course 
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CourseController()