import './MainHero.scss'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import { useHeroAnimation } from '../lib/hooks/useHeroAnimation'

import heroImg1 from '../../../assets/images/hero-img1.png'
import heroImg2 from '../../../assets/images/hero-img2.png'
import heroImg3 from '../../../assets/images/hero-img3.png'
import personGroup from '../../../assets/images/personGroup.png'
import sixtyPercent from '../../../assets/images/60.png'

const MainHero = () => {

    useHeroAnimation()

    return (
        <section className="hero">
            <div className="hero__inner container">
                <div className="hero__header">
                    <div className="hero__subtitle">Путь в светлое будущее - это IT</div>
                    <h1 className="hero__title">
                        Мы сделаем тебя <span className="hero__title-word"><div className="hero__title-star"><Icon name="GreenStar" className="visible-mobile" /></div>профи</span> за несколько <span className="hero__span"><div className="hero__span-icon"><Icon name="Underline" className="visible-mobile" /></div>месяцев</span>
                    </h1>
                    <div className="hero__header-stars">
                        <Icon name="Stars" />
                    </div>
                    <div className="hero__header-arrow">
                        <Icon name="Curl-arrow" />
                    </div>
                    <div className="hero__button-container">
                        <div className="hero__button-icon">
                            <Icon name="Sparkle" />
                        </div>
                        <div className="button-animation">
                            <Button to="/courses" className="blue">Посмотреть курсы</Button>
                        </div>
                    </div>
                </div>
                <div className="hero__image-container-1">
                    <img className="hero__image1" src={heroImg1} loading="eager" alt="" />
                    <div className="hero__image-panel1" />
                </div>
                <div className="hero__image-container-2">
                    <img className="hero__image2" src={heroImg2} loading="eager" alt="" />
                    <div className="hero__image-panel2" />
                </div>
                <div className="hero__image-container-3">
                    <img className="hero__image3" src={heroImg3} loading="eager" alt="" />
                    <div className="hero__image-panel3" />
                </div>
                <div className="hero__bottom">
                    <div className="hero__bottom-student">
                        <img className="hero__bottom-students" src={personGroup} alt="" />
                        <img className="hero__bottom-percent" src={sixtyPercent} alt="" />
                        <p>Студентов работают<br />по специальности</p>
                    </div>
                    <div className="hero__bottom-motivation">
                        <p>Приглашаем ознакомится с нашими курсами которые<br />подойдут абсолютно всем</p>
                    </div>
                </div>
                <div className="hero__bottom-mobile">
                    <div className="hero__mobile-students"><p>60% наших студентов <br /> работают по специальности</p></div>
                    <div className="hero__mobile-help"><p>Взаимо помощь и <br /> отзывчивость среди студентов</p></div>
                </div>
            </div>
        </section>
    )
}

export default MainHero