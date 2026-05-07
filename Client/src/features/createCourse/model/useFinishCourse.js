import { useState } from "react"
import { useAuthFetch } from "../../auth/model/useAuthFetch"
import { finishCourse } from "../api/createCourse"

export const useFinishCourse = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const authFetch = useAuthFetch()

    const fetchFinish = async (courseId) => {
        try {
            setLoading(true)
            setError('')
            const res = await finishCourse(courseId, authFetch)
            return res
        } catch (e) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, fetchFinish }
}
