const Router = require('express')
const router = new Router()
const courseUserController = require('../controllers/courseUserController')
const isAuth = require('../middleware/authMiddleware')

router.post('/', isAuth, courseUserController.create)
router.post('/set-completed-lesson', isAuth, courseUserController.set)
router.get('/:id', isAuth, courseUserController.getCourses)

module.exports = router