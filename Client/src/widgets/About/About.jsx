import './About.scss'
import clsx from 'clsx'
import Icon from '@/shared/Icon/Icon'
import { useAboutAnimation } from '../lib/hooks/useAboutAnimation'


const About = ({
  title,
  subtitle,
  titleNode,
  items,
  text,
  image,
  button,
  variant = "list",
  ready = true,
  className = "",
}) => {
  const { headerRef, argumentsRef, elementsRef } = useAboutAnimation(ready, variant)
  
  const ellipseClasses = clsx('about__Ellipse2', {
    course: variant === "text"
  })

  return (
    <section className={`about ${className}`}>
      <div className="about__inner container">

        <div className="about__info info">
          <div className="info__header h1" ref={headerRef}>
            {titleNode || title}
          </div>

          {variant === "list" && (
            <ul className="info__arguments"  ref={argumentsRef}>
              <div className="info__arguments-inner">
                {items.map((item, i) => (
                  <li className="info__item" key={i}>
                    <div className="info__item-title h4">{item.title}</div>
                    <div className="info__item-description">{item.text}</div>
                  </li>
                ))}
              </div>
            </ul>
          )}

          {variant === "text" && (
            <div className="info__arguments" ref={argumentsRef}>
              <div className="info__arguments-inner course">
                <div className="info__item-title h4">{subtitle}</div>
                {text.split('\n\n').map((p, i) => (
                    <p key={i} className="info__item-description">{p}</p>
                ))}
                {button && <div className="info__button">{button}</div>}
                <div className="info__icon">
                    <Icon name="Squares" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="scrollAnimationContainer" ref={elementsRef}>
          <img className="about__image" src={image} loading="lazy" alt="" />
          <div className="about__Ellipse"><Icon name="Ellipse"/></div>
          <div className={ellipseClasses}><Icon name="Ellipse2"/></div>
          <div className="about__Ellipse3"><Icon name="Ellipse3"/></div>
          <div className="about__EllipseOrbit"><Icon name="EllipseOrbit"/></div>
          <div className="about__Object"><Icon name="Object"/></div>
          <div className="about__StarInGreen"><Icon name="StarInGreen"/></div>
        </div>

        <div className="about__EllipseGroup">
          <Icon name="EllipseGroup"/>
        </div>
      </div>
    </section>
  )
}

export default About