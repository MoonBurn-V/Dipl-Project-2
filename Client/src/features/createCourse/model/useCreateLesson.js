import { useState } from "react"
import { useAuthFetch } from "../../auth/model/useAuthFetch"
import { createLesson } from "../api/createLesson"

export const useCreateLesson = () => {
    const [lessonId, setLessonId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const authFetch = useAuthFetch()

    const fetchCreate = async (data, courseId) => {
        try {
            setLoading(true)
            setError('')
            const res = await createLesson(data, courseId, authFetch)
            setLessonId(res?.id ?? null)
            return res
        } catch (e) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }

    return { lessonId, loading, error, fetchCreate }
}
