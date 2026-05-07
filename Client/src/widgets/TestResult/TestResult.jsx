import './TestResult.scss'
import { TestResultContext } from '@/providers/TestResultProvider'
import { getCorrectAnswers } from '@/entities/test/api/getCorrectAnswers'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useContext } from 'react'
import Button from '@/shared/Button/Button'
import { BaseModal } from '@/shared/Modal/BaseModal'

const TestResult = () => {

    const { isOpen, closeModal, testData, onRetry, setTestPassed, setUserAnswers } = useContext(TestResultContext)

    const percent = testData?.userPercent || 0
    const questions = testData?.questions
    const answers = testData?.answers || 0
    const failedAttempts = testData?.failedAttempts || 0
    const lessonId = testData?.lessonId || 0
    const titleText = percent <= testData?.passing_percentage ? "Попробуй ещё" : "Тест пройден!"
    const buttonText = percent <= testData?.passing_percentage ? "Попробовать ещё" : "Закрыть"
    //const modalRef = useRef(null)
    const counterRef = useRef(null)

    useGSAP(() => {
        if (!counterRef.current) return
        
        const counter = { value: 0 }
        
        gsap.to(counter, {
            value: percent,
            duration: 3,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: function() {
                if (counterRef.current) {
                    counterRef.current.textContent = `${Math.floor(counter.value)}`
                }
            }
        })
    }, { dependencies: [percent] })

    const handleFirstButton = () => {
        if (buttonText === "Попробовать ещё") {
            closeModal()
            onRetry?.()
        } else {
            closeModal()
        }
    }

    const handleSecondButton = async () => {
        setTestPassed(true)
        const correctAnswers = await getCorrectAnswers(lessonId)
        setUserAnswers(correctAnswers)
        closeModal()
    }

    if (!isOpen) return

    return (
        <BaseModal isOpen={isOpen} onClose={closeModal} title={titleText}>
            <div className="test-result__results">
                <div className="test-result__circle" style={{ '--value': percent }}>
                    <div className="test-result__circle-percent h2" ref={counterRef}></div>
                </div>
                {answers && (
                <div className="test-result__result-comparison">
                        {answers} правильных из {questions}
                    </div>
                )}
            </div>

            <div className="test-result__buttons">
                <Button className="menu-button blue" onClick={handleFirstButton}>{buttonText}</Button>
                {failedAttempts >= 2 && (
                <Button className="menu-button blue" onClick={handleSecondButton}>Показать правильные ответы</Button>
                )}
            </div>
        </BaseModal>
    )
}

export default TestResult