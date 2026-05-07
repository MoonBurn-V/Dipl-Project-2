export const getTest = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        const lesson = await res.json()
        return lesson
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}