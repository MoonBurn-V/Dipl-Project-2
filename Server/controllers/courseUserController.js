const { Courses_Users, Courses, Lessons } = require('../models/models')
const ApiError = require('../error/ApiError')

class CourseUserController {
    async create(req, res, next) {
        try {
            const { user_id, course_id } = req.body

            const existing = await Courses_Users.findOne({
                where: { user_id, course_id }
            })

            if (existing) {
                return res.status(200).json({
                    message: "Курс уже подключен",
                    alreadyExists: true
                })
            }

            const userCourse = await Courses_Users.create({
                user_id,
                course_id,
                lessons_completed: 1
            })

            return res.status(201).json(userCourse)

        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async set(req, res, next) {
        try {

            const { user_id, course_id, order_number, completed } = req.body

            const existing = await Courses_Users.findOne({
                where: { user_id, course_id }
            })

            const course = await Courses.findByPk(course_id)

            if (!existing) {
                return res.status(404).json({
                    message: "Курс не найден у пользователя"
                })
            }

            if (completed) {
                existing.completed = true
            } else {
                existing.lessons_completed = order_number
            }

            if (completed === false) {
                existing.completed = false
            }



            await existing.save()

            return res.json(existing)

        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getCourses(req, res, next) {
        try {
            const { id } = req.params
            const { role } = req.query 

            let result = []

            if (role === 'Преподаватель') {
                const teacherCourses = await Courses.findAll({
                    where: { creator_id: id }
                })

                result = teacherCourses.map(course => ({
                    course_id: course.id,
                    title: course.title,
                    image: course.image,
                    type: course.type,
                }))
            } else {
                const coursesUsers = await Courses_Users.findAll({
                    where: { user_id: id },
                    include: [{
                        model: Courses,
                        attributes: ['id', 'title', 'image', 'number_lessons', 'type']
                    }]
                })

                for (const courseUser of coursesUsers) {
                    const currentLesson = await Lessons.findOne({
                        where: {
                            course_id: courseUser.course_id,
                            order_number: courseUser.lessons_completed === 0 ? 1 : courseUser.lessons_completed
                        },
                        attributes: ['order_number', 'title']
                    })

                    result.push({
                        course_id: courseUser.course_id,
                        title: courseUser.Course.title,
                        image: courseUser.Course.image,
                        type: courseUser.Course.type,
                        number_lessons: courseUser.Course.number_lessons,
                        lessons_completed: courseUser.lessons_completed,
                        current_lesson: currentLesson ? {
                            order_number: currentLesson.order_number,
                            title: currentLesson.title
                        } : null,
                        course_completed: courseUser.completed
                    })
                }
            }

            return res.json(result)

        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CourseUserController()