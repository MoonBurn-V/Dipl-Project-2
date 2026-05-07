const Router = require('express')
const router = new Router()
const lessonController = require('../controllers/lessonController')
const isAuth = require('../middleware/authMiddleware')

router.post('/', lessonController.create)
router.get('/', lessonController.getAll)
router.get('/by-order', isAuth, lessonController.getByOrder)
router.get('/first', isAuth, lessonController.getFirst)
router.get('/:id', isAuth, lessonController.getOne)

module.exports = router