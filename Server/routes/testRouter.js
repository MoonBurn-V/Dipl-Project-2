const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')

router.post('/', testController.create)
router.post('/check', testController.check)
router.get('/by-lesson/:lessonId', testController.getByLesson)
router.get('/correct-answers/:lessonId', testController.getCorrectAnswers)
module.exports = router