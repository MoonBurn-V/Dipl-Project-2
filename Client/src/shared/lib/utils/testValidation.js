export const testValidation = (test, userAnswers, setErrors) => {
    const validate = () => {
        const newErrors = {}

        test?.Questions?.forEach(q => {
            const answer = userAnswers[q.id]

            if (q.type === "text" && !answer?.trim()) {
                newErrors[q.id] = true
            }

            if (q.type === "single" && !answer) {
                newErrors[q.id] = true
            }

            if (q.type === "multiple" && (!Array.isArray(answer) || answer.length === 0)) {
                newErrors[q.id] = true
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return validate
}