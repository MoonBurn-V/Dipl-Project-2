import './Header.scss'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import Logo from '@/shared/Logo/Logo'
import { HeaderButtons } from '../HeaderButtons/HeaderButtons'
import BurgerButton from '@/shared/BurgerButton/BurgerButton'
import { useOverlayMenu } from '../lib/hooks/useOverlayMenu'
import { useAuth } from '@/providers/AuthContext'
import { useHeaderAnimation } from '../lib/hooks/useHeaderAnimation'

const Header = () => {

  useHeaderAnimation()

  const { isAuth, user } = useAuth()

  const {headerRef, isOpen, toggleMenu, closeMenu} = useOverlayMenu()

  const burgerButtonClasses = clsx(
    'header__burger-button ', 'visible-tablet',
    {
      'active': isOpen
    }
  )

  const overlayClasses = clsx(
    'header__overlay',
    {
      'active': isOpen
    }
  )

  const menuItems = [
    {label: "О нас", to: "about", showAlways: true},
    {label: "Курсы", to: "courses", showAlways: true},
    {label: "Контакты", to: "contacts", showAlways: true},
    {label: "Админ. панель", to: "admin", requiredRole: "Администратор"}
  ]

  const filteredMenuItems = menuItems.filter(item => {
    if (item.showAlways) return true
    if(!item.requiredRole) return true
    
    return isAuth && user?.role === item.requiredRole
  })

  return (
    <header className="header" ref={headerRef}>
      <div className="header__inner container">
        <div className="logo-container">
          <Logo 
            className="header__logo" 
            loading="eager"
            onClick={closeMenu}
          />
        </div>
        <div
          className={overlayClasses}
        >          
        <nav className="header__menu">
            <ul className="header__menu-list">

              {filteredMenuItems.map(({ label, to }, index) => (
                <li className="header__menu-item" key={index}>
                  <NavLink 
                    className="header__menu-link"
                    to = {to}
                    onClick = {closeMenu}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions visible-tablet">
            <HeaderButtons onClick={closeMenu} />
          </div>
        </div>
        <div className="header__actions hidden-tablet">
          <HeaderButtons />
        </div>
        <div className="BurgerButton-container">
          <BurgerButton
            className={burgerButtonClasses}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  )
}

export default Header