const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const isAuth = require('../middleware/authMiddleware')
const validate = require('../middleware/validateInput')
const validateAvatar = require('../middleware/validateAvatar')
const {
    registrationValidation,
    loginValidation,
    editValidation
} = require('../validators/userValidator')

router.post('/registration', registrationValidation, validate, validateAvatar, userController.registration)
router.post('/login', loginValidation, validate, userController.login)
router.post('/refresh', userController.refresh)
router.post('/logout', userController.logout)
router.post('/edit', editValidation, validate, validateAvatar, isAuth, userController.edit)
router.get('/:id', isAuth, userController.getInfo)

router.post('/edit-password', userController.editPassword)

module.exports = router