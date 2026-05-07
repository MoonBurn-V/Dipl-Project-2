import './Button.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Children } from 'react'
import Icon from '../Icon/Icon'

const Button = (props) => {
  const { className, type = 'button', href, to, children, ...rest } = props

  const isExternalLink = href !== undefined
  const isInternalLink = to !== undefined
  let Component = 'button'

  if (isExternalLink) Component = 'a'
  if (isInternalLink) Component = Link

  const allProps = {
    ...rest,
    className: clsx('button', { 'button--icon': Children.count(children) === 1 && children.type === Icon }, className),
    ...(isExternalLink && { href }),
    ...(isInternalLink && { to }),
    ...(!isExternalLink && !isInternalLink && { type })
  }

  return (
    <Component {...allProps}>
      {children}
    </Component>
  )
}

export default Button