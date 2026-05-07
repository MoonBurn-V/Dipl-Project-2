import { useState, useEffect } from "react"
import { validateInput } from "../utils/validation"

export const useForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
        server: ''
    })

    const [activeField, setActiveField] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const onChange = (initValue, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: initValue,
        }))

        setErrors(prev => ({
            ...prev,
            [field]: validateInput(initValue, field)
        }))

        if (field === "confirmPassword") {

        }
    }

    const onFocus = (field) => {
        setActiveField(field)
    }

    useEffect(() => {
        (errors.email === '' && errors.login === '' && errors.password === '') 
        ? setIsDisabled(false)
        : setIsDisabled(true)
    }, [errors])

    return {
        formData,
        errors,
        activeField,
        isDisabled,
        setFormData,
        onChange,
        onFocus,
        setErrors
    }
}