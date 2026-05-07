import './ErrorMessage.scss'

export const ErrorMessage = ({id, errorText}) => {
    return (
        <div className="error-message" id={id}>
            <p>{errorText}</p>
        </div>
    )
}