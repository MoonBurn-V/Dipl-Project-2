import { validateInput, validatePasswordConfirmation } from "./validation";

describe('Валидация формы', () => {
    test('Валидация поля login', () => {
        expect(validateInput('Вася', 'login')).toBe('')
        expect(validateInput('Ва', 'login')).toContain('минимум 3 символа')
        expect(validateInput('Ваdffgda234334234242%%%$$$#fdsfvbghfghsgfsasfSEDF', 'login'))
            .toContain('максимум 20 символов')
    })

    test('Валидация поля Email', () => {
        expect(validateInput('test@example.com', 'email')).toBe('')

        expect(validateInput('testexample.com', 'email'))
            .toContain('символ @')

        expect(validateInput('test@@example.com', 'email'))
            .toContain('ровно один символ @')

        expect(validateInput('@example.com', 'email'))
            .toContain('текст до символа @')

        expect(validateInput('.test@example.com', 'email'))
            .toContain('локальная часть не должна начинаться или заканчиваться точкой')

        expect(validateInput('test.@example.com', 'email'))
            .toContain('локальная часть не должна начинаться или заканчиваться точкой')

        expect(validateInput('te..st@example.com', 'email'))
            .toContain('локальная часть не должна содержать две точки подряд')

        expect(validateInput('test@', 'email'))
            .toContain('текст после символа @')

        expect(validateInput('test@examplecom', 'email'))
            .toContain('точку в доменной части')

        expect(validateInput('test@example.c', 'email'))
            .toContain('домен верхнего уровня не менее 2 символов')

        expect(validateInput('test@.example.com', 'email'))
            .toContain('доменная часть не должна начинаться или заканчиваться точкой')

        expect(validateInput('test@example.com.', 'email'))
            .toContain('доменная часть не должна начинаться или заканчиваться точкой')

        expect(validateInput('test<>@example.com', 'email'))
            .toContain('только допустимые символы')

        const longEmail = 'a'.repeat(250) + '@ex.com'
        expect(validateInput(longEmail, 'email'))
            .toContain('длину не более 254 символов')
    })

    test('Валидация поля password', () => {
        expect(validateInput('Aa1!aaaa', 'password')).toBe('')

        expect(validateInput('AA1!AAAA', 'password'))
            .toContain('строчные буквы')

        expect(validateInput('aa1!aaaa', 'password'))
            .toContain('заглавные буквы')

        expect(validateInput('Aa!aaaaa', 'password'))
            .toContain('цифры')

        expect(validateInput('Aa1aaaaa', 'password'))
            .toContain('спецсимволы (!@#$%^&*)')

        expect(validateInput('Aa1!', 'password'))
            .toContain('минимум 8 символов')
    })

    test('Подтверждение пароля', () => {
        expect(validatePasswordConfirmation('', '')).toBe('')

        expect(validatePasswordConfirmation('123', '')).toBe('')

        expect(validatePasswordConfirmation('Aa1!aaaa', 'Aa1!aaaa')).toBe('')

        expect(validatePasswordConfirmation('Aa1!aaaa', 'Aa1!aaab'))
            .toBe('Пароли не совпадают')
    })
})