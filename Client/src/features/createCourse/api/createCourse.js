export const createCourse = async (data, authFetch) => {
    try {
        const payload = new FormData()
        payload.append('title', data.title.trim())
        payload.append('price', data.price === '' ? '' : String(data.price))
        payload.append('difficulty', data.level)
        payload.append('type', data.audience)
        payload.append('description', data.description.trim())
        payload.append('mini_description', data.shortDescription.trim())
        payload.append('creator_id', String(data.creatorId))

        if (data.image) {
            payload.append('image', data.image)
        }

        const res = await authFetch("/api/course/", {
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

export const finishCourse = async (courseId, authFetch) => {
    try {
        const res = await authFetch(`/api/course/${courseId}/finish`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
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