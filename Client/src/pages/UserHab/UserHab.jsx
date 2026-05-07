import './UserHab.scss'
import { useTitle } from '@/providers/TitleContext'
import { UserProfile } from '@/widgets/UserProfile/UserProfile'
import { UserCourse } from '@/widgets/UserCourse/UserCourse'
import { useAuth } from '@/providers/AuthContext'
import { useFetchGetUserCourses } from '@/entities/userCourse/model/useFetchGetUserCourses'
import { ServerError } from '@/widgets/ServerError/ServerError'
import { useUserInfo } from '@/features/editUserProfile/model/useUserInfo'
import { UserHabSkeleton } from '@/widgets/UserHabSkeleton/UserHabSkeleton'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'


const UserHab = () => {

    const { logout, user } = useAuth()
    const { data: courses, loading, error } = useFetchGetUserCourses(user?.id, user?.role)
    const { data: userInfo } = useUserInfo(user.id)

    useTitle("MegaSkills | Личный кабинет")

    if (loading) return <UserHabSkeleton />
    if(error) return (<ServerError loading={loading} error={error}/>)

    return (
        <section className="hab">
            <div className="hab__inner container">
                <UserProfile 
                    logout={logout} 
                    type={"isHab"}
                    userName={userInfo?.name}
                    userAvatar={userInfo?.avatar}
                />
                <div className="hab__courses">
                    <div className="hab__courses-header">
                        <h2 className="hab__courses-title">
                            Ваши курсы
                        </h2>
                        {user?.role === 'Преподаватель' && (
                            <Button
                                className="hab__courses-button menu-button blue"
                                to="/create-course"
                                title="Создать курс"
                                aria-label="Создать курс"
                            >
                                <Icon name="Plus" />
                            </Button>
                        )}
                    </div>
                    <div className="hab__courses-wrapper">
                        {courses?.map((course, i) => {
                            const progress = course.course_completed 
                            ? 100 
                            : Math.round((course.lessons_completed / course.number_lessons) * 100)

                            return(
                                <UserCourse progress={progress} data={course} key={i} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserHab