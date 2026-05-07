import './CourseCompleted.scss'
import Button from '@/shared/Button/Button'

const CourseCompleted = () => {
    return (
        <section className='course-completed'>
            <h1 className='course-completed__title'>Поздравляем! Вы успешно<br/>завершили курс!</h1>
            <img 
                className="course-completed__image" 
                src="/assets/images/sert1.png" 
                alt="Ваш сертификат" 
            />
            <a href="/assets/images/sert1.png" download="certificate.png">
                <Button className="course-completed__button menu-button blue">
                    Загрузить
                </Button>
            </a>
        </section>
    )
}

export default CourseCompleted