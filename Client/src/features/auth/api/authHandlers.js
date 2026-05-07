import { jwtDecode } from "jwt-decode"

export const handleAuthSubmit = async (formData, authType, login, closeAuth, setErrors) => {
    try {
        const url = authType === "Регистрация"
            ? "/api/user/registration"
            : "/api/user/login"

        const body = authType === "Регистрация"
            ? {
                name: formData.login,
                email: formData.email,
                password: formData.password,
            }
            : {
                email: formData.email,
                password: formData.password,
            }

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body) 
        })

        const data = await res.json()
        
        if (!res.ok) {
            setErrors(prev => ({
                ...prev,
                server: data.message || 'Ошибка авторизации',
            }))
            return
        }

        const token = data.accessToken
        const decoded = jwtDecode(token)

        login(token, {
            id: decoded.id,
            role: decoded.role,
        })

        closeAuth()
    } catch (e) {
        setErrors(prev => ({...prev, server: "Ошибка сети"}))
    }
}