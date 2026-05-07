import { useState } from "react"
import { fixLessonCompleted } from "../api/fixLessonCompleted"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useFetchLessonCompleted = () => {
  const [data, setData] = useState(null)
  const authFetch = useAuthFetch()

  const fetchLessonCompleted = async (connectData) => {
    const res = await fixLessonCompleted(connectData, authFetch)
    setData(res)
    return res
  }

  return { data, fetchLessonCompleted }
}