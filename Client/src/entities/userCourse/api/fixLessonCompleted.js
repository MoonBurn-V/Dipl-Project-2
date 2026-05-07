export const fixLessonCompleted = async (data, authFetch) => {

    try {
        const res = await authFetch("/api/course-user/set-completed-lesson", {
            method: 'POST',
            body: JSON.stringify(data)
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