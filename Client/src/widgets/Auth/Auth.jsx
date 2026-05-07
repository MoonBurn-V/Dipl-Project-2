import './Auth.scss'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useAuth } from '@/providers/AuthContext'
import { useModal } from '@/shared/lib/hooks/useModal'
import { useMobileHeight } from '@/shared/lib/hooks/useMobileHeight'
import { handleAuthSubmit } from '@/features/auth/api/authHandlers'
import { useForm } from '@/shared/lib/hooks/useForm'
import { validatePasswordConfirmation } from '../../shared/lib/utils/validation'
import { getStatus } from '@/shared/lib/utils/formHelpers'
import { CloseModalButton } from '@/shared/CloseModalButton/CloseModalButton'
import Button from '@/shared/Button/Button'
import Field from '@/shared/Field/Field'
import Checkbox from '@/shared/Checkbox/Checkbox'

const Auth = () => {

    const { formData, errors, activeField, isDisabled, onChange, onFocus, setErrors } = useForm()

    const { isAuthOpen, closeAuth, authType, toggleAuthType, login } = useAuth()
    const isMobileHeight = useMobileHeight()

    const modalRef = useModal(isAuthOpen, closeAuth)
    
    const textButton = authType === "Вход" ? "Войти" : "Зарегистрироваться"
    const passwordComplete = authType === "Вход" ? "current-password" : "new-password"
    
    const formClasses = clsx('auth__form', {
        'mobile': isMobileHeight
    })
    
    const submitButtonClasses = clsx('auth__login blue', {
        'long': authType === "Регистрация"
    })

    useEffect(() => {
        if (authType === "Регистрация" && (formData.password || formData.confirmPassword)) {
            const confirmationError = validatePasswordConfirmation(formData.password, formData.confirmPassword)
            setErrors(prev => ({ ...prev, confirmPassword: confirmationError }))
        }
    }, [formData.password, formData.confirmPassword, authType, setErrors])
    
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await handleAuthSubmit(formData, authType, login, closeAuth, setErrors)
    }
    
    if(!isAuthOpen) return null
    
    return (
        <>
            <div className="auth">
                <form className={formClasses} ref={modalRef} onSubmit={handleFormSubmit}>

                    <CloseModalButton onClick={closeAuth}/>

                    <div className="auth__title h3">{authType}</div>

                    <div className="auth__fields">
                        {authType === "Регистрация" && (
                            <Field
                                fieldClass={"field-dark"}
                                statusValid={getStatus(formData.login, errors.login)}
                                labelText="Имя" 
                                id="name"
                                autocomplete="name"
                                placeholder="Ваше имя"
                                value={formData.login}
                                onChange={e => onChange(e.target.value, "login")}
                                onFocus={() => onFocus("login")}
                                ariaBy="error-message"
                            />
                        )}

                        <Field
                            fieldClass={"field-dark"}
                            statusValid={getStatus(formData.email, errors.email)}
                            labelText="Email"
                            id="email"
                            autocomplete="email"
                            placeholder="Ваш email"
                            value={formData.email}
                            onChange={e => onChange(e.target.value, "email")}
                            onFocus={() => onFocus("email")}
                            ariaBy="error-message"
                        />

                        <Field
                            fieldClass={"field-dark"}
                            statusValid={getStatus(formData.password, errors.password)}
                            labelText="Пароль"
                            id="password"
                            autocomplete={passwordComplete}
                            placeholder="Ваш пароль"
                            type="password"
                            value={formData.password}
                            onChange={e => onChange(e.target.value, "password")}
                            onFocus={() => onFocus("password")}
                            ariaBy="error-message"
                        />
                        
                        {authType === "Регистрация" && (
                            <Field
                                fieldClass={"field-dark"}
                                statusValid={getStatus(formData.confirmPassword, errors.confirmPassword)}
                                labelText="Повторите пароль"
                                id="confirmPassword"
                                autocomplete="new-password"
                                placeholder="Повторите пароль"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={e => onChange(e.target.value, "confirmPassword")}
                                onFocus={() => onFocus("confirmPassword")}
                                ariaBy="error-message"
                            />
                        )}

                        {(errors.email || errors.login || errors.password 
                        || errors.confirmPassword || errors.server) && (() => {

                            const errorMessage = errors[activeField] === ''
                            ? (errors.login || errors.email || errors.password 
                                || errors.confirmPassword || errors.server) 
                            : errors[activeField]

                            return(
                                <div className="auth__message" id="error-message">
                                    {errorMessage}
                                </div>
                            )

                        })()}

                    </div>

                    <div className="auth__check">
                        <Checkbox text={authType === "Вход" ? "Подписаться на рассылку" : "Обработка конфиденциальных данных"} />
                        {authType === "Вход" && (
                            <Button className='auth__forgive' type="button">Забыли пароль?</Button>
                        )}
                    </div>

                    <Button className={submitButtonClasses} type="submit" disabled={isDisabled}>
                        {textButton}
                    </Button>
                    
                    <div className="auth__question">
                        <p>
                            {authType === "Вход" ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}
                        </p>
                        <Button className="auth__button" type="button" onClick={toggleAuthType}>
                            {authType === "Вход" ? "Тогда зарегистрируйтесь!" : "Войти в аккаунт!"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth