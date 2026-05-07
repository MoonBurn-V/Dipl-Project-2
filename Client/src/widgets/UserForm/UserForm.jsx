import "./UserForm.scss"
import Field from "@/shared/Field/Field"
import { useForm } from "@/shared/lib/hooks/useForm"
import { useEditProfile } from "@/features/editUserProfile/model/useEditProfile"
import { getStatus } from "@/shared/lib/utils/formHelpers"
import { ErrorMessage } from "@/shared/ErrorMessage/ErrorMessage"
import Button from "@/shared/Button/Button"
import { useEffect } from "react"
import clsx from "clsx"

export const UserForm = ({ userId, user }) => {

    const { formData, errors, setFormData, activeField, isDisabled, onChange, onFocus } = useForm()
    const { fetchEditProfile } = useEditProfile()

    const hasChanges = formData.login !== user?.name || formData.email !== user?.email
    const formDisable = !hasChanges || isDisabled

    const buttonClasses = clsx("user-form__button menu-button", {
        blue: !formDisable,
        hover: formDisable,
    })

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            email: user?.email || '',
            login: user?.name || '',
        }))
    }, [user])

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const data = {
            id: userId,
            name: formData.login,
            email: formData.email
        }

        fetchEditProfile(data)
    }

    return (
        <form 
            className="user-form__data"
            onSubmit={handleOnSubmit}
        >
            <div className="user-form__inputs">
                
                <Field
                    fieldClass={"field-light"}
                    statusValid={getStatus(formData.login, errors.login)}
                    labelText="Имя" 
                    id="name"
                    autocomplete="name"
                    placeholder="Ваше имя"
                    value={formData.login}
                    baseValue={user?.name}
                    onChange={e => onChange(e.target.value, "login")}
                    onFocus={() => onFocus("login")}
                    ariaBy="error-message"
                />

                <Field
                    fieldClass={"field-light"}
                    statusValid={getStatus(formData.email, errors.email)}
                    labelText="Email"
                    id="email"
                    autocomplete="email"
                    placeholder="Ваш email"
                    value={formData.email}
                    baseValue={user?.email}
                    onChange={e => onChange(e.target.value, "email")}
                    onFocus={() => onFocus("email")}
                    ariaBy="error-message"
                />

                {(errors.email || errors.login || errors.server) && (() => {

                    const errorMessage = errors[activeField] === ''
                    ? (errors.login || errors.email || errors.server) 
                    : errors[activeField]

                    return(
                        <ErrorMessage 
                            id={"error-message"} 
                            errorText={errorMessage}
                        />
                    )

                })()}

            </div>

            <Button 
                className={buttonClasses}
                type="submit"
                disabled={formDisable}
            >
                Подтвердить изменения
            </Button>
        </form>
    )
}