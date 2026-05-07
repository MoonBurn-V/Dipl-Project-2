import './TestForm.scss'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import clsx from 'clsx'
import { useState, useImperativeHandle, forwardRef } from 'react'

const TestForm = forwardRef(({ onTestCreate, onCancel, onQuestionsChange, disabled = false }, ref) => {
    const [testTitle, setTestTitle] = useState('')
    const [passingPercentage, setPassingPercentage] = useState('')
    const [questions, setQuestions] = useState([])
    const [currentQuestionType, setCurrentQuestionType] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentAnswers, setCurrentAnswers] = useState([])
    const [currentCorrectAnswers, setCurrentCorrectAnswers] = useState([])
    const [currentTextAnswer, setCurrentTextAnswer] = useState('')

    const creatorClasses = clsx("test-form__question-creator", {
        "ml": !currentQuestionType
    })

    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(new Event('submit'))
            return testTitle.trim() && questions.length > 0
        },
        canSubmit: testTitle.trim() && questions.length > 0,
        cancel: () => onCancel?.()
    }))

    const handleAddQuestionClick = (type) => {
        setCurrentQuestionType(type)
        resetCurrentQuestion()
    }

    const resetCurrentQuestion = () => {
        setCurrentQuestion('')
        setCurrentAnswers([])
        setCurrentCorrectAnswers([])
        setCurrentTextAnswer('')
    }

    const handleCancelQuestion = () => {
        setCurrentQuestionType(null)
        resetCurrentQuestion()
    }

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...currentAnswers]
        newAnswers[index] = value
        setCurrentAnswers(newAnswers)
    }

    const handleCorrectAnswerChange = (index) => {
        if (currentQuestionType === 'single') {
            setCurrentCorrectAnswers([index])
        } else if (currentQuestionType === 'multiple') {
            const newCorrectAnswers = [...currentCorrectAnswers]
            if (newCorrectAnswers.includes(index)) {
                newCorrectAnswers.splice(newCorrectAnswers.indexOf(index), 1)
            } else {
                newCorrectAnswers.push(index)
            }
            setCurrentCorrectAnswers(newCorrectAnswers)
        }
    }

    const handleAddQuestion = () => {
        if (currentQuestionType === 'text') {
            if (!currentQuestion.trim() || !currentTextAnswer.trim()) {
                return
            }

            const newQuestion = {
                id: Date.now(),
                type: currentQuestionType,
                text: currentQuestion.trim(),
                answer: currentTextAnswer.trim()
            }

            const updatedQuestions = [...questions, newQuestion]
            setQuestions(updatedQuestions)
            onQuestionsChange?.(updatedQuestions.length)
            handleCancelQuestion()
        } else {
            if (!currentQuestion.trim() || currentAnswers.some(a => !a.trim()) || currentCorrectAnswers.length === 0) {
                return
            }

            const newQuestion = {
                id: Date.now(),
                type: currentQuestionType,
                text: currentQuestion.trim(),
                answers: currentAnswers.map(a => a.trim()),
                correctAnswers: currentCorrectAnswers
            }

            const updatedQuestions = [...questions, newQuestion]
            setQuestions(updatedQuestions)
            onQuestionsChange?.(updatedQuestions.length)
            handleCancelQuestion()
        }
    }

    const handleDeleteQuestion = (id) => {
        const updatedQuestions = questions.filter(q => q.id !== id)
        setQuestions(updatedQuestions)
        onQuestionsChange?.(updatedQuestions.length)
    }

    const handleSubmit = (event) => {
        event?.preventDefault()

        if (!testTitle.trim() || questions.length === 0) {
            return
        }

        const testData = {
            title: testTitle.trim(),
            passingPercentage: passingPercentage ? parseInt(passingPercentage) : 60,
            questions: questions,
            status: 'В разработке'
        }

        console.log(testData)

        onTestCreate(testData)
    }

    const getAnswerFieldsCount = () => {
        if (currentQuestionType === 'single') return 3
        if (currentQuestionType === 'multiple') return 4
        return 0
    }

    const isFormValid = () => {
        if (!currentQuestion.trim()) return false
        
        if (currentQuestionType === 'text') {
            return currentTextAnswer.trim() !== ''
        }

        const answersCount = getAnswerFieldsCount()
        return (
            currentAnswers.length === answersCount &&
            currentAnswers.every(a => a.trim()) &&
            currentCorrectAnswers.length > 0
        )
    }

    const canAddQuestion = isFormValid()

    return (
        <div className="test-form">
            <div className="test-form__header">
                <h2 className="test-form__title">Создание теста</h2>
                {onCancel && (
                    <button
                        type="button"
                        className="test-form__cancel-button"
                        onClick={onCancel}
                        disabled={disabled}
                        title="Отменить создание теста"
                    >
                        <Icon name="Close" />
                    </button>
                )}
            </div>

            <div className="test-form__main-field">
                <div className="field-light">
                    <label className="field-light__label" htmlFor="test-title">
                        Название теста
                    </label>
                    <div className="field-light__input-wrapper">
                        <input
                            id="test-title"
                            className="field-light__input"
                            type="text"
                            placeholder="Введите название теста"
                            value={testTitle}
                            onChange={(e) => setTestTitle(e.target.value)}
                            disabled={disabled}
                            required
                        />
                    </div>
                </div>

                <div className="field-light">
                    <label className="field-light__label" htmlFor="test-passing-percentage">
                        Процент для прохождения (%)
                    </label>
                    <div className="field-light__input-wrapper">
                        <input
                            id="test-passing-percentage"
                            className="field-light__input"
                            type="number"
                            min="0"
                            max="100"
                            step="10"
                            placeholder="Введите процент (0-100)"
                            value={passingPercentage}
                            onChange={(event) => setPassingPercentage(event.target.value)}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>

            <div className="test-form__content">
                {questions.length > 0 && (
                    <div className="test-form__questions-list">
                        <h4 className="field-light__label">Добавленные вопросы:</h4>
                        <div className="test-form__questions-items">
                            {questions.map((question, index) => (
                                <div key={question.id} className="test-form__question-item">
                                    <div className="test-form__question-content">
                                        <span className="test-form__question-number">
                                            {index + 1}.
                                        </span>
                                        <div>
                                            <p className="test-form__question-text">
                                                {question.text}
                                            </p>
                                            {question.type === 'text' && (
                                                <p className="test-form__answer-item">
                                                    {question.answer}
                                                </p>
                                            )}
                                            {question.type !== 'text' && (
                                                <ul className="test-form__answers-list">
                                                    {question.answers.map((answer, answerIndex) => (
                                                        <li key={answerIndex} className="test-form__answer-item">
                                                            {answer}
                                                            {question.correctAnswers.includes(answerIndex) && (
                                                                <span className="test-form__correct-mark">✓</span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="test-form__delete-button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                        disabled={disabled}
                                        title="Удалить вопрос"
                                    >
                                        <Icon name="Close" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className={creatorClasses}>
                    {!currentQuestionType ? (
                        <div className="test-form__type-selector">
                            <span className="test-form__selector-text">Создать вопрос с:</span>
                            <div className="test-form__button-group">
                                <Button
                                    className="test-form__type-button menu-button blue"
                                    type="button"
                                    onClick={() => handleAddQuestionClick('single')}
                                    disabled={disabled}
                                >
                                    одним ответом
                                </Button>
                                <Button
                                    className="test-form__type-button menu-button blue"
                                    type="button"
                                    onClick={() => handleAddQuestionClick('multiple')}
                                    disabled={disabled}
                                >
                                    несколько ответов
                                </Button>
                                <Button
                                    className="test-form__type-button menu-button blue"
                                    type="button"
                                    onClick={() => handleAddQuestionClick('text')}
                                    disabled={disabled}
                                >
                                    текстовый ответ
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="test-form__question-form">
                            <div className="field-light">
                                <label className="field-light__label" htmlFor="question-text">
                                    Текст вопроса
                                </label>
                                <div className="field-light__input-wrapper">
                                    <textarea
                                        id="question-text"
                                        className="test-form__textarea"
                                        placeholder="Введите текст вопроса"
                                        value={currentQuestion}
                                        onChange={(e) => setCurrentQuestion(e.target.value)}
                                        disabled={disabled}
                                        rows="3"
                                    />
                                </div>
                            </div>

                            {currentQuestionType !== 'text' && (
                                <div className="test-form__answers-form">
                                    <h5 className="field-light__label">Варианты ответов:</h5>
                                    {Array.from({ length: getAnswerFieldsCount() }).map((_, index) => (
                                        <div key={index} className="test-form__answer-field">
                                            <div className="field-light">
                                                <label 
                                                    className="field-light__label" 
                                                    htmlFor={`answer-${index}`}
                                                >
                                                    Ответ {index + 1}
                                                </label>
                                                <div className="field-light__input-wrapper">
                                                    <input
                                                        id={`answer-${index}`}
                                                        className="field-light__input"
                                                        type="text"
                                                        placeholder={`Введите вариант ответа ${index + 1}`}
                                                        value={currentAnswers[index] || ''}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                            <label className="test-form__checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    className="test-form__checkbox"
                                                    checked={currentCorrectAnswers.includes(index)}
                                                    onChange={() => handleCorrectAnswerChange(index)}
                                                    disabled={disabled}
                                                />
                                                Правильный ответ
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentQuestionType === 'text' && (
                                <div className="test-form__text-answer-form">
                                    <div className="field-light">
                                        <label className="field-light__label" htmlFor="text-answer">
                                            Правильный ответ
                                        </label>
                                        <div className="field-light__input-wrapper">
                                            <input
                                                id="text-answer"
                                                className="field-light__input"
                                                type="text"
                                                placeholder="Введите правильный ответ"
                                                value={currentTextAnswer}
                                                onChange={(e) => setCurrentTextAnswer(e.target.value)}
                                                disabled={disabled}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="test-form__question-actions">
                                <Button
                                    className={clsx("test-form__action-button menu-button", {
                                        blue: canAddQuestion && !disabled,
                                        hover: !canAddQuestion || disabled
                                    })}
                                    type="button"
                                    onClick={handleAddQuestion}
                                    disabled={!canAddQuestion || disabled}
                                >
                                    Добавить вопрос
                                </Button>
                                <Button
                                    className="test-form__action-button menu-button"
                                    type="button"
                                    onClick={handleCancelQuestion}
                                    disabled={disabled}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

TestForm.displayName = 'TestForm'

export default TestForm