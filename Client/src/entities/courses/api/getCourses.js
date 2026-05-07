export const getCourses = async (url) => {

    try {
        const res = await fetch(url, {
            method: 'GET',
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