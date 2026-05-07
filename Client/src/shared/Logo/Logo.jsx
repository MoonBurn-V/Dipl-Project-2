import './Logo.scss'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export default (props) => {
  const { className, loading = 'lazy', onClick } = props

  const title = 'На главную'

  return (
    <NavLink
      className={clsx('logo', className)}
      to="/"
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      <img
        className="logo__image"
        src="/assets/images/Logo.png"
        alt=""
        width={200}
        height={68}
        loading={loading}
      />
    </NavLink>
  )
}