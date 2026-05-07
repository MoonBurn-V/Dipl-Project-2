import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/providers/AuthContext"

const ProtectedRoute = ({ deniedRoles = [] }) => {
    const { isAuth, isLoading, user } = useAuth()

    if (isLoading) return null

    if (!isAuth) {
        return <Navigate to="/" replace />
    }

    if (deniedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default ProtectedRoute