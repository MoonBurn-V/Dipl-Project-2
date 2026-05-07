const Router = require('express')
const router = new Router()
const userProgressController = require('../controllers/userProgressController')

router.post('/', userProgressController.create)
router.get('/', userProgressController.getAll)

module.exports = router