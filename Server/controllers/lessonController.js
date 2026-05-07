const { Lessons } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class LessonController {
    async create(req, res, next) {
        try {
            const { title, content, video, order_number, status, course_id, test } = req.body

            let videoName = null

            if (req.files && req.files.video) {
                const { video } = req.files
                videoName = uuid.v4() + ".mp4"
                const staticPath = path.resolve(__dirname, '..', 'static/video')

                await video.mv(path.join(staticPath, videoName))
            }

            const lessons = await Lessons.create({ 
                title, 
                content,
                video: videoName,
                order_number, 
                status,
                course_id,
                test
            })
            
            // Обновить number_lessons в курсе
            const { Courses } = require('../models/models')
            const lessonCount = await Lessons.count({ where: { course_id } })
            await Courses.update(
                { number_lessons: lessonCount },
                { where: { id: course_id } }
            )
            
            return res.json(lessons)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const {course_id} = req.query
        const lessons = await Lessons.findAll({where: {course_id}})
        return res.json(lessons)
    }

    async getByOrder(req, res, next) {
        try {
            const { course_id, order } = req.query

            if (!course_id || !order) {
                return next(ApiError.badRequest("course_id and order are required"))
            }

            const lesson = await Lessons.findOne({
                where: {
                    course_id,
                    order_number: order
                }
            })

            if (!lesson) {
                return next(ApiError.notFound("Lesson not found"))
            }

            return res.json(lesson)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getFirst(req, res, next) {
        const {course_id} = req.query
        

        if (!course_id) {
            return next(ApiError.badRequest("course_id is required"))
        }


        const lesson = await Lessons.findOne({where: {course_id: course_id, order_number: 1}})
        return res.json(lesson)
    }

    async getOne(req, res) {
        const {id} = req.params
        const course = await Lessons.findOne({ where: {id} })
        return res.json(course)
    }
}

module.exports = new LessonController()