import './Field.scss'
import { useState } from 'react'
import clsx from 'clsx'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

const Field = (props) => {
    const {
        fieldClass,
        statusValid,
        labelText,
        id,
        autocomplete,
        type = "text", 
        placeholder, 
        ariaBy,
        value,
        baseValue,
        onChange,
        onFocus
    } = props

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleVisible = (event) => {
        event.preventDefault()
        setIsPasswordVisible(!isPasswordVisible)
    }

    const inputClasses = clsx(`${fieldClass}__input`, {
        white: statusValid === '',
        red: statusValid === 'error',
        green: statusValid === 'valid' && value !== baseValue
    })

    const wrapperClass = `${fieldClass}__input-wrapper`
    const labelClass = `${fieldClass}__label`
    const buttonClass = `${fieldClass}__button`
    const iconNameOpen = fieldClass === "field-dark" ? "OpenEye" : "OpenEye-W"
    const iconNameClose = fieldClass === "field-dark" ? "ClosedEye" : "ClosedEye-W"

    const getInputType = () => {
        return isPasswordVisible ? 'text' : 'password'
    }

    const renderInput = () => {
        if (type === 'password') {
            return (
                <div className={wrapperClass}>
                    <input
                        type={getInputType()}
                        className={inputClasses}
                        placeholder={placeholder}
                        id={id}
                        autoComplete={autocomplete}
                        aria-describedby={ariaBy}
                        required
                        value={value || ''}
                        onChange={onChange}
                        onFocus={onFocus}
                    />
                    <Button
                        type="button"
                        className={buttonClass}
                        aria-label="Посмотреть пароль"
                        title="Посмотреть пароль"
                        onClick={handleVisible}
                    >
                        <Icon name={isPasswordVisible ? iconNameOpen : iconNameClose}/>
                    </Button>
                </div>
            )
        }

        return (
            <div className={wrapperClass}>
                <input
                    type={type}
                    className={inputClasses}
                    placeholder={placeholder}
                    id={id}
                    autoComplete={autocomplete}
                    aria-describedby={ariaBy}
                    required
                    value={value || ''}
                    onChange={onChange}
                    onFocus={onFocus}
                />
            </div>
        )
    }

    return (
        <div className={fieldClass}>
            <label htmlFor={id} className={labelClass}>
                {labelText}
            </label>
            {renderInput()}
        </div>
    )
}

export default Field