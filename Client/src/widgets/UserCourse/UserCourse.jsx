import './UserCourse.scss'
import Button from '@/shared/Button/Button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { useAuth } from '@/providers/AuthContext'

// Импортируем дефолтные изображения
import cardUser from '../../../assets/images/card-user.jpeg'
import cardProgrammist from '../../../assets/images/card-programmist.jpg'
import cardAdmin from '../../../assets/images/card-admin.jpg'

// Создаем объект-мап с импортированными переменными
const DEFAULT_IMAGES_BY_TYPE = {
    'Для пользователей': cardUser,
    'Для программистов': cardProgrammist,
    'Для администраторов': cardAdmin,
}

export const UserCourse = ({progress, data}) => {

    const { user } = useAuth()
    const cardRef = useRef(null)
    const isTeacher = user?.role === 'Преподаватель'
    const correctLesson = data?.lessons_completed === 0 ? 1 : data?.lessons_completed
    const buttonLink = data.course_completed 
        ? `/courses/${data?.course_id}/lesson/1` 
        : `/courses/${data?.course_id}/lesson/${data?.lessons_completed}`
    const buttonText = isTeacher ? "Изменить" : (data.course_completed ? "Начать заново" : "Продолжить")

    const imagePath = data?.image 
        ? `/static/images/${data.image}` 
        : DEFAULT_IMAGES_BY_TYPE[data?.type]

    useGSAP(() => {
        if (isTeacher) return

        const fill = cardRef.current.querySelector('.hab__course-progress-bar-fill')
        const text = cardRef.current.querySelector('.hab__course-progress-text')

        const progressObj = { value: 1 }

        gsap.to(fill, {
            width: `${progress}%`,
            duration: 3,
            ease: 'power2.out'
        })

        gsap.to(progressObj, {
            value: progress,
            duration: 3,
            ease: 'power2.out',
            roundProps: 'value',
            onUpdate: () => {
                if (text) {
                    text.textContent = `Пройден на: ${progressObj.value}%`
                }
            }
        })

    }, { scope: cardRef })

    return (
        <div className="hab__course" ref={cardRef}>
            <div className="hab__course-body">
                <img
                    src={imagePath}
                    alt={data?.title}
                    className="hab__course-image"
                />
                <div className="hab__course-content">
                    <h3 className="hab__course-title">
                        {data?.title}
                    </h3>
                    <h4 className="hab__course-text">
                        {`Вы остановились на: ${correctLesson} уроке — ${data?.current_lesson?.title || "Базовое название"}`}
                    </h4>
                    <Button
                        className="hab__course-button menu-button blue"
                        to={buttonLink}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
            {!isTeacher && (
                <div className="hab__course-progress">
                    <h5 className="hab__course-progress-text">
                        Пройден на: 1%
                    </h5>
                    <div className="hab__course-progress-bar">
                        <div className="hab__course-progress-bar-fill"/>
                    </div>
                </div>
            )}
        </div>
    )
}