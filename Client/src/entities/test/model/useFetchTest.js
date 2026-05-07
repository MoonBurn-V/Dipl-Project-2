import { useEffect, useState } from "react"
import { getTest } from "../api/getTest"

export const useFetchTest = (lessonId) => {
    const [data, setData] = useState(null)    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getTest(`/api/test/by-lesson/${lessonId}`)
                setData(res)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [lessonId])    

    return { data, loading }
}
