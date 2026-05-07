import { useState, useEffect } from "react"
import { getUserCourses } from "../api/getUserCourses"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useFetchGetUserCourses = (userId, userRole) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const authFetch = useAuthFetch()

  const fetchGetUserCourses = async () => {
    try {
      setLoading(true)
      const res = await getUserCourses(userId, userRole, authFetch)
      setData(res)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchGetUserCourses()
  }, [userId])

  return { data, loading, error }
}