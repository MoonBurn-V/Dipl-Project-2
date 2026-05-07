export const editProfile = async (data, authFetch) => {
    try {
        const formData = new FormData()
        formData.append("id", data.id)

        if (data.avatar) {
            formData.append("avatar", data.avatar)
        }

        if (data.deleteAvatar) {
            formData.append("deleteAvatar", "true")
        }

        if (data.name && data.email) {
            formData.append("name", data.name)
            formData.append("email", data.email)
        }

        const res = await authFetch("/api/user/edit", {
            method: "POST",
            body: formData
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        return await res.json()
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}