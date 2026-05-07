export const createLesson = async (lessonData, courseId, authFetch) => {
    try {
        const payload = new FormData()
        payload.append('title', lessonData.title.trim())
        payload.append('content', '')
        payload.append('order_number', lessonData.orderNumber)
        payload.append('course_id', String(courseId))
        payload.append('status', 'В разработке')
        payload.append('test', 'да')

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

export const createTest = async (testData, lessonId, authFetch) => {
    try {
        const payload = JSON.stringify({
            passing_percentage: testData.passingPercentage,
            status: testData.status,
            lesson_id: lessonId,
            questions: testData.questions.map(question => {
                if (question.type === 'text') {
                    return {
                        text: question.text,
                        type: question.type,
                        answer: question.answer
                    }
                } else {
                    return {
                        text: question.text,
                        type: question.type,
                        answers: question.answers,
                        correctAnswers: question.correctAnswers
                    }
                }
            })
        })

        const res = await authFetch("/api/test/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
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
