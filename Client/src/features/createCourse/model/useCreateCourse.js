import { useState } from "react"
import { useAuthFetch } from "../../auth/model/useAuthFetch"
import { createCourse } from "../api/createCourse"

export const useCreateCourse = () => {
    const [courseId, setCourseId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const authFetch = useAuthFetch()

    const fetchCreate = async (data) => {
        try {
            setLoading(true)
            setError('')
            const res = await createCourse(data, authFetch)
            setCourseId(res?.id ?? null)
            return res
        } catch (e) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }

    return { courseId, loading, error, fetchCreate }
}