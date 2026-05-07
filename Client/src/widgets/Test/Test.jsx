import './Test.scss'
import { Question } from '@/shared/Question/Question'
import { useFetchTest } from '@/entities/test/model/useFetchTest'
import { useTestController } from '../lib/hooks/useTestController'
import { TestResultContext } from '@/providers/TestResultProvider'
import { ErrorMessage } from '@/shared/ErrorMessage/ErrorMessage'
import Button from '@/shared/Button/Button'
import { useEffect, useContext } from 'react'

export const Test = ({ lessonId, getTestResult}) => {

    const {data: test, loading} = useFetchTest(lessonId)
    const { userAnswers, setUserAnswers } = useContext(TestResultContext)
    const { 
        handleChange, 
        handleResult, 
        result,
        errorMessage, 
        errors 
    } = useTestController(lessonId, test, userAnswers, setUserAnswers)

    useEffect(() => {
        if (result && Object.keys(result).length > 0) {
            getTestResult(result)
        }
    }, [result, getTestResult])

    if (loading) return (<h1>Загрузка теста</h1>)

    return (
        <section className="test">
            <div className="test__container container">
                {test.Questions?.map(q => (
                    <Question 
                        key={q.id}
                        question={q}
                        onChange={handleChange}
                        value={userAnswers[q.id]}
                        hasError={!!errors[q.id]}
                    />
                ))}

                { errorMessage && (
                    <ErrorMessage errorText={"Пожалуйста ответьте на все вопросы!"} />
                )}
                
                <Button className="test__button menu-button blue" onClick={handleResult}>
                    Отправить ответы
                </Button>
            </div>
        </section>
    )
}