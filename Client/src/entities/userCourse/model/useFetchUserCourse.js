import { useState } from "react"
import { fixCourse } from "../api/fixCourse"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useFetchUserCourse = () => {
  const [data, setData] = useState(null)
  const authFetch = useAuthFetch()

  const fetchUserCourse = async (connectData) => {
    const res = await fixCourse(connectData, authFetch)
    setData(res)
    return res
  }

  return { data, fetchUserCourse }
}