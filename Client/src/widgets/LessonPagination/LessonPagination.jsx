import './LessonPagination.scss'
import Button from '@/shared/Button/Button'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useFetchLesson } from '@/entities/lessons/model/useFetchLesson'
import { useLessonNavigation } from '../lib/hooks/useLessonNavigation'
import { UserCoursesContext } from '@/providers/UserCoursesProvider'
import { useContext } from 'react'
import { useFetchLessonCompleted } from '@/entities/userCourse/model/useFetchLessonCompleted'


export const LessonPagination = ({orderNumber, courseId, loading}) => {

    const navigate = useNavigate()
    const { data: lessons } = useFetchLesson(`/api/lesson/?course_id=${courseId}`)
    const { prev, next, canGoNext } = useLessonNavigation(lessons, orderNumber)
    const { getData } = useContext(UserCoursesContext) 
    const { fetchLessonCompleted } = useFetchLessonCompleted()

    if (loading) return null
    if (!courseId) return null

    const handelPrevClick = (e) => {
        e.preventDefault()

        if (!prev) return

        navigate(`/courses/${courseId}/lesson/${prev.order_number}`)
    }

    const handelNextClick = (e) => {
        e.preventDefault()

        if (!canGoNext) return

        if (!next) {
            const idData = getData(courseId)
            const data = {
                ...idData,
                completed: true,
                order_number: orderNumber
            }

            fetchLessonCompleted(data)
            
            navigate(`/completed/${courseId}`)
            return
        }

        const idData = getData(courseId)

        const dataOrderNumber = orderNumber + 1
        const data = {
            ...idData,
            completed: false,
            order_number: dataOrderNumber
        }

        fetchLessonCompleted(data)

        navigate(`/courses/${courseId}/lesson/${next.order_number}`)
    }

    const nextButtonText = !next ? "Завершить курс" : "Следующий урок"

    const prevButtonClasses = clsx('lesson-pagination__button menu-button', {
        blue: prev,
        hover: !prev
    })

    const nextButtonClasses = clsx('lesson-pagination__button menu-button', {
        blue: canGoNext,
        hover: !canGoNext
    })

    return (
        <section className="lesson-pagination">
            <div className="lesson-pagination__container container">
                <Button 
                    to={prev ? `/courses/${courseId}/lesson/${prev.order_number}` : "#"}
                    className={prevButtonClasses}
                    onClick={handelPrevClick}
                    disabled={!prev}
                >
                    Предыдущий урок
                </Button>
                <Button
                    to={next ? `/courses/${courseId}/lesson/${next.order_number}` : "/completed"}
                    className={nextButtonClasses}
                    onClick={handelNextClick}
                    disabled={!next}
                >
                    {nextButtonText}
                </Button>
            </div>
        </section>
    )
}