export const getUserInfo = async (userId, authFetch) => {

    try {
        const res = await authFetch(`/api/user/${userId}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        const data = await res.json()
        return data
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}