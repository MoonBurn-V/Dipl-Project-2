import { useEffect, useState } from "react"
import { getCourses } from "../api/getCourses"

export const useCourse = (id) => {
    const [courseData, setCourseData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return

        const load = async () => {
            try {
                setLoading(true)
                const data = await getCourses(`/api/course/${id}`)
                setCourseData(data)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [id])

    return { courseData, loading, error }
}