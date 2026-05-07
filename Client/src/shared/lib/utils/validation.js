export const validateInput = (value, field) => {
    if (!value) return ''

    const errors = []

    if (field === 'login') {
        if (value.length < 3) {
            errors.push('минимум 3 символа')
        }
        if (value.length > 20) {
            errors.push('максимум 20 символов')
        }
        
        if (errors.length > 0) {
            return `Логин должен содержать: ${errors.join(', ')}`
        }
        
        return ''
    }
    
    if (field === 'email') {
        if (!value.includes('@')) {
            errors.push('символ @')
        } else {
            const parts = value.split('@')
            if (parts.length !== 2) {
                errors.push('ровно один символ @')
            } else {
                const [localPart, domainPart] = parts
                
                if (localPart.length === 0) {
                    errors.push('текст до символа @')
                }
                if (localPart.startsWith('.') || localPart.endsWith('.')) {
                    errors.push('локальная часть не должна начинаться или заканчиваться точкой')
                }
                if (localPart.includes('..')) {
                    errors.push('локальная часть не должна содержать две точки подряд')
                }
                
                if (domainPart.length === 0) {
                    errors.push('текст после символа @')
                } else {
                    if (!domainPart.includes('.')) {
                        errors.push('точку в доменной части')
                    } else {
                        const domainParts = domainPart.split('.')
                        const tld = domainParts[domainParts.length - 1]
                        if (tld.length < 2) {
                            errors.push('домен верхнего уровня не менее 2 символов')
                        }
                        if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
                            errors.push('доменная часть не должна начинаться или заканчиваться точкой')
                        }
                    }
                }
            }
        }
        
        if (value.length > 254) {
            errors.push('длину не более 254 символов')
        }
        
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!emailRegex.test(value)) {
            errors.push('только допустимые символы')
        }
        
        if (errors.length > 0) {
            return `Email должен содержать: ${errors.join(', ')}`
        }
        
        return ''
    }

    if (field === 'password') {
        if (!/(?=.*[a-z])/.test(value)) {
            errors.push('строчные буквы')
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            errors.push('заглавные буквы')
        }
        if (!/(?=.*\d)/.test(value)) {
            errors.push('цифры')
        }
        if (!/(?=.*[!@#$%^&*])/.test(value)) {
            errors.push('спецсимволы (!@#$%^&*)')
        }
        if (value.length < 8) {
            errors.push('минимум 8 символов')
        }
        
        if (errors.length > 0) {
            return `Пароль должен содержать: ${errors.join(', ')}`
        }
        
        return ''
    }
    
    return ''
}

export const validatePasswordConfirmation = (password, confirmPassword) => {
    if (!password && !confirmPassword) return ''
    if (!confirmPassword) return ''
    
    if (confirmPassword !== password) {
        return 'Пароли не совпадают'
    }
    
    return ''
}