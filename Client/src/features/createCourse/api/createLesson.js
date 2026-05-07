export const createLesson = async (data, courseId, authFetch) => {
    try {
        const payload = new FormData()
        payload.append('title', data.title.trim())
        payload.append('content', data.content)
        payload.append('order_number', data.orderNumber)
        payload.append('course_id', String(courseId))
        payload.append('status', data.status || 'В разработке')
        payload.append('test', data.test || 'нет')

        if (data.video) {
            payload.append('video', data.video)
        }

        const res = await authFetch("/api/lesson/", {
            method: "POST",
            body: payload
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
