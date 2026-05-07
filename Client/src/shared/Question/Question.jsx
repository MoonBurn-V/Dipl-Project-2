import './Question.scss'
import clsx from 'clsx'

export const Question = ({ question, onChange, value, hasError }) => {
    const isMultiple = question.type === "multiple"
    const safeValue = isMultiple ? (value ?? []) : value

    const handleText = (e) => {
        onChange(question.id, e.target.value)
    }

    const handleSingle = (answerId) => {
        onChange(question.id, answerId)
    }

    const handleMultiple = (answerId, checked) => {
        onChange(question.id, prev => {
            const prevSafe = prev ?? []
            return checked
                ? [...prevSafe, answerId]
                : prevSafe.filter(id => id !== answerId)
        })
    }

    const titleClasses = clsx('question__title h4', { error: hasError })

    return (
        <div className="question">
            <div className={titleClasses}>{question.text}</div>

            <div className="question__answers">
                {question.type === "text" ? (
                    <input
                        className="question__input"
                        type="text"
                        value={value ?? ''}
                        onChange={handleText}
                    />
                ) : (
                    question.Answers?.map(a => (
                        <label key={a.id} className="question__answer">
                            <input
                                type={isMultiple ? "checkbox" : "radio"}
                                name={`q-${question.id}`}
                                checked={
                                    isMultiple
                                        ? safeValue.includes(a.id)
                                        : safeValue === a.id
                                }
                                onChange={e =>
                                    isMultiple
                                        ? handleMultiple(a.id, e.target.checked)
                                        : handleSingle(a.id)
                                }
                            />
                            <span className={clsx('question__span', {
                                radio: !isMultiple,
                                checkbox: isMultiple
                            })} />
                            <p>{a.text}</p>
                        </label>
                    ))
                )}
            </div>
        </div>
    )
}