export const getUserCourses = async (userId, userRole, authFetch) => {

    try {
        const res = await authFetch(`/api/course-user/${userId}?role=${userRole}`, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`)
        }

        const courses = await res.json()
        return courses
    } catch (e) {
        console.log("Ошибка сервера:", e.message)
        throw e
    }
}