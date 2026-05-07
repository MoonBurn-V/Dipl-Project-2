import './Footer.scss'
import { Link } from 'react-router-dom'
import Logo from '@/shared/Logo/Logo1'
import Icon from '@/shared/Icon/Icon'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__inner">
          <div className="footer__inner-column column-1">
            <Logo className="header__logo" loading="eager"/>
            <p>Следите за нами в:</p>
            <div className="footer__icons">
              <a  href="https://vk.com/public197491482" className="footer__icon">
                <Icon name="VK" />
              </a>
              <a href="https://uslugi.yandex.ru/profile/Itsale-1780114" className="footer__icon">
                <Icon name="Yandex" />
              </a>
              <a href="https://uslugi.yandex.ru/profile/Itsale-1780114" className="footer__icon">
                <Icon name="OK" />
              </a>
            </div>
          </div>
          <div className="footer__inner-column">
            <div className="footer__inner-title">НАВИГАЦИЯ</div>
            <ul className="footer__inner-list">
              <li className="footer__inner-item">
                <Link to="/">Главная</Link>
              </li>
              <li className="footer__inner-item">
                <Link to="about">О нас</Link>
              </li>
              <li className="footer__inner-item">
                <Link to="courses">Курсы</Link>
              </li>
              <li className="footer__inner-item">
                <Link to="contacts">Контакты</Link>
              </li>
            </ul>
          </div>
          <div className="footer__inner-column">
            <div className="footer__inner-title">НАШИ КУРСЫ</div>
            <ul className="footer__inner-list">
              <li className="footer__inner-item">
                <Link to="/">Для пользователей</Link>
              </li>
              <li className="footer__inner-item">
                <Link to="">Для администраторов</Link>
              </li>
              <li className="footer__inner-item">
                <Link to="/">Для программистов</Link>
              </li>
            </ul>
          </div>
          <div className="footer__inner-column">
            <div className="footer__inner-title">СВЯЗАТЬСЯ С НАМИ</div>
            <ul className="footer__inner-list">
              <li className="footer__inner-item">
                <a href="tel:+74951804977">8 (495) 180-49-77</a>
              </li>
              <li className="footer__inner-item">
                <a href="mailto:zakaz@itsale.ru">zakaz@itsale.ru</a>
              </li>
              <li className="footer__inner-item-icons">
                <a className="footer__icon" href="https://t.me/+79257693998">
                  <Icon name="TG" />
                </a>
                <a className="footer__icon" href="https://wa.me/79257693998">
                  <Icon name="WA" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom-container container">
          <p>© 2021 - 2026 Все права защищены. ITsale (ООО «СЭЙЛ СОФТ»)</p>
          <Link to="#">Политика конфиденциальности сайта</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer