import './CourseCompleted.scss'
import Button from '@/shared/Button/Button'
import { useLocation } from 'react-router-dom'

import castom1 from '../../../assets/images/castom-01.png'
import castom2 from '../../../assets/images/castom-02.png'


const CourseCompleted = () => {
    const { state } = useLocation()
    const fullName = state?.fullName || ''
    const firstName = fullName.split(' ')[0] || ''
    const imagePath = firstName === 'Петров' ?  castom2 : castom1

    return (
        <section className='course-completed'>
            <h1 className='course-completed__title'>Поздравляем! Вы успешно<br/>завершили курс!</h1>
            <img 
                className="course-completed__image"
                src={imagePath}
                alt="Ваш сертификат" 
            />
            <a href={imagePath} download="certificate.png">
                <Button className="course-completed__button menu-button blue">
                    Загрузить
                </Button>
            </a>
        </section>
    )
}

export default CourseCompleted