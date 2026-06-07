import './UserProfile.scss'
import { UserAchievements } from '../UserAchievements/UserAchievements'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useEditProfile } from '@/features/editUserProfile/model/useEditProfile'
import baseUser from '../../../assets/images/base-user.png'

export const UserProfile = ({logout, type, userId, userName, userAvatar }) => {

    const { id } = useParams()
    const [avatar, setAvatar] = useState("")
    const fileInputRef = useRef(null)
    const { fetchEditProfile } = useEditProfile()

    useEffect(() => {
        if (userAvatar) {
            setAvatar(`/static/images/${userAvatar}`)
        } else {
            setAvatar(baseUser)
        }
    }, [userAvatar])


    const handleAvatarClick = () => {
        fileInputRef.current.click()
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const preview = URL.createObjectURL(file)
        setAvatar(preview)

        const data = {
            id: userId,
            avatar: file
        }

        fetchEditProfile(data)
    }

    const handelDelete = async () => {
        setAvatar(baseUser)

        const data = {
            id: userId,
            deleteAvatar: true
        }

        await fetchEditProfile(data)
    }

    return (
        <div className="hab__user">
            <div className="hab__user-info">
                <div className="hab__user-panel">
                    <img
                        className="hab__user-image"
                        src={avatar || baseUser}
                        alt="Аватар пользователя"
                    />

                    {type === "isEdit" && (
                        <>
                            <Button
                                className="hab__user-button1 menu-button blue"
                                title="Изменить аватар"
                                aria-label="Изменить аватар"
                                onClick={handleAvatarClick}
                            >
                                <Icon name="Edit" />
                            </Button>
                            <Button
                                className="hab__user-button2 menu-button blue"
                                title="Удалить аватар"
                                aria-label="Удалить аватар"
                                onClick={handelDelete}
                            >
                                <Icon name="Trash" />
                            </Button> 

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />                      
                        </>
                    )}

                    {type === "isHab" && (
                        <>
                            <Button
                                className="hab__user-button1 menu-button blue"
                                title="Изменить данные аккаунта"
                                aria-label="Изменить данные аккаунта"
                                to={`/edit-user/${id}`}
                            >
                                <Icon name="Edit" />
                            </Button>
                            <Button
                                className="hab__user-button2 menu-button blue"
                                title="Выйти из аккаунта"
                                aria-label="Выйти из аккаунта"
                                onClick={logout}
                                to="/"
                            >
                                <Icon name="Exit" />
                            </Button>                        
                        </>
                    )}
                </div>
                <h1 className="hab__user-name">
                    {userName}
                </h1>
            </div>
            {type === "isHab" && (
                <div className="hab__achievements">
                    <h2 className="hab__achievements-title">
                        Достижения
                    </h2>
                    <UserAchievements />
                </div>
            )}
        </div>
    )
}