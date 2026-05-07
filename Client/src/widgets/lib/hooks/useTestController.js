import { useState, useContext } from "react";
import { testValidation } from "@/shared/lib/utils/testValidation";
import { getCheckTest } from "@/entities/test/api/getCheckTest";
import { TestResultContext } from '@/providers/TestResultProvider'

export const useTestController =(lessonId, test, userAnswers, setUserAnswers) => {
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState(false)
    const [result, setResult] = useState({})
    const validate = testValidation(test, userAnswers, setErrors)
    const [failedAttempts, setFailedAttempts] = useState(0)
    const { openModal, setTestPassed } = useContext(TestResultContext)
    let nextFailedAttempts =0
    
    const restTest = () => {
        setUserAnswers({})
        setErrors({})
        setErrorMessage(false)
        setResult({})
    }

    const handleChange = (questionId, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: 
                typeof value === 'function'
                ? value(prev[questionId])
                : value
        }))

        if (errors[questionId]) {
            setErrors(prev => ({ ...prev, [questionId]: false }))
        }
    }

    const handleResult = async () => {
        if (!validate()) {
            setErrorMessage(true)
            return
        } else {
            setErrorMessage(false)
        }

        const payload = {
            lessonId,
            answers: Object.entries(userAnswers).map(([questionId, value]) => {
                return {
                    questionId: Number(questionId),
                    value
                }
            })
        }

        const result = await getCheckTest(payload)

        if (result.userPercent <= 66) {
            nextFailedAttempts = failedAttempts + 1
            setFailedAttempts(nextFailedAttempts)
        }

        openModal(
            {
                ...result,
                failedAttempts: nextFailedAttempts
            },
            restTest,
            lessonId
        )

        setTestPassed(result.testPassed)
        setResult(result)
    }

    return { 
        handleChange, 
        handleResult,
        setUserAnswers,
        restTest,
        result, 
        errorMessage, 
        failedAttempts,
        errors
    }
}