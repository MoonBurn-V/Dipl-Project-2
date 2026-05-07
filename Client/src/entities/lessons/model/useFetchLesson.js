import { useState, useEffect } from "react"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useFetchLesson = (url) => {
    
    const authFetch = useAuthFetch()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await authFetch(url, { method: 'GET' })

                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`)
                }

                const json = await res.json()
                setData(json)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [url])

    return { data, loading, error }
}