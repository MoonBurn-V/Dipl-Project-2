import './Icons.scss'
import clsx from 'clsx'

const Icon = (props) => {
  const { name, ariaLabel } = props

  return (
    <span className={clsx('icon', `icon--${name}`)} aria-label={ariaLabel}></span>
  )
}

export default Icon