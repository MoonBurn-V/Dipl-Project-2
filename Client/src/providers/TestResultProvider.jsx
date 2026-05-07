import { createContext, useState } from "react";

export const TestResultContext = createContext()

export const TestResultProvider = ({ children }) => {
    const [userAnswers, setUserAnswers] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [testData, setTestData] = useState(null)
    const [onRetry, setOnRetry] = useState(null)
    const [testPassed, setTestPassed] = useState(false)

    const openModal = (data, retryCallback, lessonId) => {
        if (data) {
            setTestData({
                userPercent: data.userPercent || 0,
                questions: data.numberQuestions || 0,
                answers: data.numberCorrectUserAnswers || 0,
                failedAttempts: data.failedAttempts || 0,
                lessonId: lessonId
            })
        }
        setOnRetry(() => retryCallback)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setTestData(null)
    }

    return (
        <TestResultContext.Provider value={{
            userAnswers,
            isOpen,
            testData,
            onRetry,
            testPassed,
            setUserAnswers,
            openModal,
            closeModal,
            setTestPassed
        }}>
            {children}
        </TestResultContext.Provider>
    )
}