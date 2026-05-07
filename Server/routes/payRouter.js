const Router = require('express')
const router = new Router()
const payController = require('../controllers/payController')

router.post('/', payController.create)
router.get('/',payController.getAll)

module.exports = router