import { useState, useEffect } from "react"
import { getUserInfo } from "../api/getUserInfo"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useUserInfo = (userId) => {
    const [data, setData] = useState(null)
    const authFetch = useAuthFetch()

    const fetchGetUserInfo = async () => {
        const res = await getUserInfo(userId, authFetch)
        setData(res)
        return res
    }

    useEffect(() => {
        if (!userId) return
        fetchGetUserInfo()
    }, [userId])

    return { data }
}