import './EditUser.scss'
import { useAuth } from '../../providers/AuthContext'
import { UserProfile } from '@/widgets/UserProfile/UserProfile'
import { UserForm } from '@/widgets/UserForm/UserForm'
import { useUserInfo } from '@/features/editUserProfile/model/useUserInfo'

const EditUser = () => {

    const {user} = useAuth()
    const { data: userInfo } = useUserInfo(user.id)

    return (
        <section className="user-edit">
            <div className="user-edit__inner container">
                <UserProfile 
                    type={"isEdit"} 
                    userId={user.id}
                    userName={userInfo?.name} 
                    userAvatar={userInfo?.avatar}
                />
                <UserForm userId={user.id} user={userInfo} />
            </div>
        </section>
    )
}

export default EditUser