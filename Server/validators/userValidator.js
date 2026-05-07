const { body } = require('express-validator')
const { query } = require('express-validator')

const nameValidator = body('name')
    .isLength({ min: 3, max: 16 })
    .withMessage('Логин должен быть от 3 до 16 символов')

const emailValidator = body('email')
    .isEmail()
    .withMessage('Некорректный email')
    .isLength({ max: 50 })
    .withMessage('Email слишком длинный')

const passwordValidator = body('password')
    .isLength({ min: 8 })
    .withMessage('Пароль должен быть минимум 8 символов')
    .matches(/[a-z]/)
    .withMessage('Пароль должен содержать строчную букву')
    .matches(/[A-Z]/)
    .withMessage('Пароль должен содержать заглавную букву')
    .matches(/\d/)
    .withMessage('Пароль должен содержать цифру')
    .matches(/[!@#$%^&*]/)
    .withMessage('Пароль должен содержать спецсимвол (!@#$%^&*)')

const searchValidation = query('search')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('Поиск слишком длинный')

exports.registrationValidation = [
    nameValidator,
    emailValidator,
    passwordValidator
]

exports.loginValidation = [
    emailValidator,
    passwordValidator
]

exports.editValidation = [
    nameValidator.optional(),
    emailValidator.optional()
]

exports.coursesValidation = [
    searchValidation
]