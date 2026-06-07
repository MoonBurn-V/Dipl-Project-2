import './Audience.scss'
import Icon from '@/shared/Icon/Icon'
import Button from '@/shared/Button/Button'
import { useAudienceAnimation } from '../lib/hooks/useAudienceAnimation'

// Импортируем изображения через ES-модули
import audienceM1 from '../../../assets/images/audience-m1.jpg'
import heroImg1 from '../../../assets/images/hero-img1.png'
import heroImg2 from '../../../assets/images/hero-img2.png'

const Audience = () => {

    const { blocL, blocR, ellipseGroup } = useAudienceAnimation()

    return(
      <section className="audience">

        <div className="container">
          <div className="audience__header">

            <div className="audience__ellipse-group" ref={ellipseGroup}>
              <div className="audience__void">
                <Icon name="EllipseVoid" />
              </div>
              <div className="audience__green">
                <Icon name="EllipseGreen" />
              </div>
              <div className="audience__blue">
                <Icon name="EllipseBlue" />
              </div>
            </div>

            <div className="audience__blue-stars">
              <Icon name="BlueStars" />
            </div>

            <div className="audience__title h1">Кому подойдут наши курсы?</div>
          </div>

          <div className="audience__content">

            <div className="audience__left" ref={blocL}>

              <div className="audience__info green">
                <h3 className="audience__info-title">Новичкам без опыта в IT</h3>
                <div className="audience__info-text">Плавно погрузитесь в профессию и освоите 1С на понятных примерах. Вас будет сопровождать практикующий эксперт: он ответит на все вопросы, объяснит непонятные темы и проверит практические работы, которые основаны на реальных рабочих задачах.</div>
              </div>

              <div className="audience__image-container left">
                <img className="audience__image-m left" src={audienceM1} loading="lazy" alt="" />
                <img className="audience__image left" src={heroImg2} loading="lazy" alt="" />
              </div>

            </div>

            <div className="audience__right" ref={blocR}>

              <div className="audience__image-container right">
                <img className="audience__image right" src={heroImg1} loading="lazy" alt="" />
                <img className="audience__image-m right" src={audienceM1} loading="lazy" alt="" />
              </div>

              <div className="audience__info blue">
                <h3 className="audience__info-title">Профессионалам своего дела</h3>
                <div className="audience__info-text">Освоите востребованную IT-профессию, не начиная всё с нуля. Вырастите из обычного пользователя в 1С-программиста и повысите свою ценность на рынке труда. Сможете получить повышение в знакомой вам сфере и больше влиять на бизнес-процессы компании.</div>

                <div className="audience__arrow">
                  <Icon name="BlueArrow" />
                </div>

              </div>            
            </div>

          </div>

          <div className="audience__button-container">
            <Button className="green" to="courses">Наши курсы</Button>
          </div>
        </div>

      </section>
    )
}

export default Audience