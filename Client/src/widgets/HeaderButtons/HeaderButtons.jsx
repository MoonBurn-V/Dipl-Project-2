import Button from '@/shared/Button/Button'
import { useAuth } from '@/providers/AuthContext'

export const HeaderButtons = ({onClick}) => {

    const { openLogin, openRegistration, isAuth, user } = useAuth()

    return(
        !isAuth ? (
            <>
                <div className="button-container">
                    <Button className="menu-button void" onClick={openLogin}>Вход</Button>
                </div>
                <div className="button-container">
                    <Button className="menu-button blue" onClick={openRegistration}>Регистрация</Button>
                </div>
            </>
        ) : (
            <div className="button-container">
                <Button className="menu-button void" to={`/hab/${user.id}`} onClick={onClick}>Личный кабинет</Button>
            </div>
        )
    )
}