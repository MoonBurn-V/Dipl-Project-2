import './CloseModalButton.scss'
import Button from '../Button/Button'

export const CloseModalButton = ({onClick}) => {
    return (
        <Button 
        className="cross" 
        type="button" 
        aria-label="Закрытие модального окна"
        onClick={onClick}
        >
            <div className="cross__line"></div>
            <div className="cross__line"></div>
        </Button>
    )
}