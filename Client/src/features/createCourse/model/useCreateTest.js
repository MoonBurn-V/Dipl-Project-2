import { useState } from "react"
import { useAuthFetch } from "../../auth/model/useAuthFetch"
import { createLesson, createTest } from "../api/createTest"

export const useCreateTest = () => {
    const [testId, setTestId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const authFetch = useAuthFetch()

    const fetchCreate = async (testData, courseId, orderNumber) => {
        try {
            setLoading(true)
            setError('')

            // Шаг 1: Создаем урок для теста
            const lessonData = {
                title: testData.title,
                orderNumber: orderNumber
            }

            const lessonRes = await createLesson(lessonData, courseId, authFetch)
            const lessonId = lessonRes?.id

            if (!lessonId) {
                throw new Error('Не удалось получить ID урока')
            }

            // Шаг 2: Создаем сам тест с использованием ID урока
            const testRes = await createTest(testData, lessonId, authFetch)
            setTestId(testRes?.id ?? null)

            return { test: testRes, lesson: lessonRes }
        } catch (e) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }

    return { testId, loading, error, fetchCreate }
}
