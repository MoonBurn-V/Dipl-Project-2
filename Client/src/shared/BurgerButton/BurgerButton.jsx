import './BurgerButton.scss'
import clsx from 'clsx'

const BurgerButton = ({ className, onClick, active }) => {
  const title = active ? 'Закрыть меню' : 'Открыть меню навигации'

  return (
    <button
      className={clsx('burger-button', { active }, className)}
      onClick={onClick}
      type="button"
      aria-label={title}
      title={title}
    >
      <div className="burger-button__inner">
        <span className="burger-button__line"></span>
        <span className="burger-button__line"></span>
        <span className="burger-button__line"></span>
        <span className="burger-button__line"></span>
      </div>
    </button>
  )
}

export default BurgerButton;