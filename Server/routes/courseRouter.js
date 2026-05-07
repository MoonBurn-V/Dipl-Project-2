const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/checkRoleMiddleware')
const validate = require('../middleware/validateInput')
const { coursesValidation } = require('../validators/userValidator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', checkRole('Преподаватель'), courseController.create)
router.get('/',  validate, coursesValidation, courseController.getAll)
router.get('/:id', courseController.getOne)
router.put('/:id/finish', authMiddleware, courseController.finishCourse)

module.exports = router