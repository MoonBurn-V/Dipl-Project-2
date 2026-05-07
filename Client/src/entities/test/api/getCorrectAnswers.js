export const getCorrectAnswers = async (lessonId) => {
    try {
        const res = await fetch(`/api/test/correct-answers/${lessonId}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        const answers = await res.json()
        return answers
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}