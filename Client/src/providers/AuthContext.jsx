import { userLogout } from '../features/auth/api/userLogout'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [authType, setAuthType] = useState('Вход')

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const isAuth = Boolean(token)

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }

        setIsLoading(false)
    }, [])

    const openLogin = () => {
        setAuthType('Вход')
        setIsAuthOpen(true)
    }

    const openRegistration = () => {
        setAuthType('Регистрация')
        setIsAuthOpen(true)
    }
    
    const toggleAuthType = () => {
        setAuthType(prev => prev === "Вход" ? "Регистрация" : "Вход")
    }
    
    const closeAuth = () => setIsAuthOpen(false)

    const login = (accessToken, userData) => {
        setToken(accessToken)
        setUser(userData)

        localStorage.setItem('token', accessToken)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = async () => {
        try {
            await userLogout()
        } catch (e) {
            console.error('Ошибка при logout:', e)
        } finally {
            setToken(null)
            setUser(null)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }

    return (
        <AuthContext.Provider value={{ 
            isAuthOpen, 
            authType,
            toggleAuthType,
            closeAuth,
            openLogin, 
            openRegistration,

            user,
            token,
            isAuth,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}