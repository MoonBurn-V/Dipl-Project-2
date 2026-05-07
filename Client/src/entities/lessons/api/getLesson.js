import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const getLesson = async (url) => {
    const authFetch = useAuthFetch()
    const token = localStorage.getItem("token")

    try {
        const res = await authFetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        const lesson = await res.json()
        return lesson
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}