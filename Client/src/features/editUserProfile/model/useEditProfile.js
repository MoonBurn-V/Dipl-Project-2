import { useState } from "react"
import { editProfile } from "../api/editProfile"
import { useAuthFetch } from "@/features/auth/model/useAuthFetch"

export const useEditProfile = () => {
    const [data, setData] = useState(null)
    const authFetch = useAuthFetch()

    const fetchEditProfile = async (connectData) => {
        const res = await editProfile(connectData, authFetch)
        setData(res)
        return res
    }

    return { data, fetchEditProfile }
}