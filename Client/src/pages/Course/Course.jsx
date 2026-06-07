import { HeroSecondary } from '@/widgets/HeroSecondary/HeroSecondary'
import { useTitle } from '@/providers/TitleContext'
import { useCourse } from '@/entities/courses/model/useCourse'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthContext'
import { UserCoursesContext } from '@/providers/UserCoursesProvider'
import { ServerError } from '@/widgets/ServerError/ServerError'
import { useFetchUserCourse } from '@/entities/userCourse/model/useFetchUserCourse'
import { useContext } from 'react'
import About from '@/widgets/About/About'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import './Course.scss'

import cardUser from '../../../assets/images/card-user.jpeg'
import cardProgrammist from '../../../assets/images/card-programmist.jpg'
import cardAdmin from '../../../assets/images/card-admin.jpg'

const DEFAULT_IMAGES_BY_TYPE = {
  'Для пользователей': cardUser,
  'Для программистов': cardProgrammist,
  'Для администраторов': cardAdmin,
}

const Course = () => {

  const { id: courseId } = useParams()
  const navigate = useNavigate()
  const { courseData, loading, error } = useCourse(courseId)
  const { isAuth, openLogin, } = useAuth()
  const { setPayOpen, getData, setCurrentCourseId } = useContext(UserCoursesContext)
  const { fetchUserCourse } = useFetchUserCourse()

  useTitle(`MegaSkills | ${courseData?.title}`)

  const handleClick = (e) => {
    e.preventDefault()

    if (!isAuth) {
      const userConfirmed = window.confirm("Пожалуйста зарегистрируйтесь")

      if (userConfirmed) {
        openLogin()
        return
      } else return
    } 

    if(courseData?.price !== null) {
      setCurrentCourseId(courseId)
      setPayOpen(true)
      return
    }

    const data = getData(courseId)

    fetchUserCourse(data)

    navigate(`/courses/${courseId}/lesson/1`)
  }

  const image = courseData?.image

  const imagePath = image 
    ? `/static/images/${image}` 
    : DEFAULT_IMAGES_BY_TYPE[courseData?.type]

  if(loading) return (<ServerError loading={loading} error={error}/>)
  if(error) return (<ServerError loading={loading} error={error}/>)

  return (
    <>
      <HeroSecondary title={courseData?.title} subtitle="КУРС:" type="courseTitle" />
      <About
        title="О курсе:"
        subtitle={courseData?.title}
        variant="text"
        //image="/assets/images/card-user.jpeg"
        image={imagePath}
        ready={!loading}
        text={courseData?.description || ""}
        button={
          <>
            <div className="info__button-icon">
              <Icon name="SparkleBlack" />
            </div>
            <Button className="green" to={`/courses/${courseId}/lesson/1`} onClick={handleClick}>Начать учиться</Button>
          </>
        }
      />
    </>
  )
}

export default Course