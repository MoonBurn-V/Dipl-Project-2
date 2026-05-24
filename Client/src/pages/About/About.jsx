import { useTitle } from '../../providers/TitleContext'
import './About.scss'
import { HeroSecondary } from '../../widgets/HeroSecondary/HeroSecondary'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Icon from '../../shared/Icon/Icon'

const About = () => {

  useTitle("MegaSkills | О нас")

  const titleRef = useRef(null)
  const imageContainerRef = useRef(null)
  const listRef = useRef(null)
  const teamLeftRef = useRef(null)
  const teamRightRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Начальные состояния
    gsap.set(titleRef.current, { opacity: 0, y: 50 })
    gsap.set(imageContainerRef.current, { opacity: 0, x: -50 })
    gsap.set(listRef.current, { opacity: 0, x: 50 })
    gsap.set(teamLeftRef.current, { opacity: 0, x: -50 })
    gsap.set(teamRightRef.current, { opacity: 0, x: 50 })

    // Анимация
    tl.to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 2, 
      ease: 'power3.out' 
    })
    .to(imageContainerRef.current, {
      opacity: 1,
      x: 0,
      duration: 2,
      ease: 'power3.out'
    }, 0.3)
    .to(listRef.current, {
      opacity: 1,
      x: 0,
      duration: 2,
      ease: 'power3.out'
    }, 0.3)
    .to(teamLeftRef.current, {
      opacity: 1,
      x: 0,
      duration: 2,
      ease: 'power3.out'
    }, 0.6)
    .to(teamRightRef.current, {
      opacity: 1,
      x: 0,
      duration: 2,
      ease: 'power3.out'
    }, 0.6)

  }, [])

  const items = [
    {
      title: "Быстрое и профессиональное внедрение 1С продуктов для автоматизации вашего бизнеса",
      text: "Подбираем как типовые, так и отраслевые продукты 1С, настраиваем процессы с нуля, моделируя бизнес-процессы и учитывая особенности вашего бизнеса."
    },
    {
      title: "Сопровождение и обслуживание текущей системы автоматизации",
      text: "Настраиваем и обслуживаем сервера, настраиваем, обновляем, ускоряем и интегрируем 1С, чтобы вывести автоматизацию вашего бизнеса на новый уровень при минимальных вложениях."
    },
    {
      title: "Масштабирование вашей системы автоматизации",
      text: "За счет настраиваемой 1С:Маркировки под ключ (для парфюмерии, одежды, обуви, текстиля, шин, а также маркировки ЕГАИС) и подключения торгового оборудования к 1С (ТСД, сканеров штрих-кода, принтеров этикеток и т.д)."
    },
  ]

  return (
    <>
      <HeroSecondary title={'ITsale'} subtitle={'О компании'} type="courseTitle" />
      
      <section className="about-page">
        <div className="container">
          <h2 ref={titleRef} className="about-page__title">ITsale — это 12 + лет опыта, экспертная команда и нишевая специализация</h2>
          
          <div className="about-page__content">
            <div ref={imageContainerRef} className="about-page__image-container">
              <img className='audience__image left' src="/assets/images/comers.png" alt="ITsale" />
            </div>
            
            <div ref={listRef} className="about-page__list rotate audience__info green">
              {items.map((item, index) => (
                <div key={index} className="about-page__item">
                  <h3 className="about-page__item-title">{item.title}</h3>
                  <p className="about-page__item-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="team-section__content">
            <div ref={teamLeftRef} className="team-section__left">
              <h2 className="team-section__title">Команда ITsale</h2>
              <p className="audience__info blue about">
                Наши преподаватели — это действующие эксперты-практики. Каждый день они работают с боевым кодом, дорабатывают типовые и нетиповые конфигурации, сопровождают сервисы 1С и управляют проектами для реального бизнеса. Компания занимается не только обучением: мы сами разрабатываем, внедряем и поддерживаем решения на 1С, поэтому делимся только тем, что действительно прошло проверку в работе. Вы будете учиться на живых примерах, а не на абстрактных задачах. И для самых старательных и толковых студентов у нас открыта дверь в команду: начните с обучения — продолжите работой у нас. Это реальный шанс войти в профессию под руководством тех, кто сам делает продукты на 1С.
              </p>
            </div>
            <div ref={teamRightRef} className="team-section__right">
              <div className="team-section__image-container-top">
                <img className="team-section__image-top" src="/assets/images/comersTeach.png" alt="Команда" />
                <div className="team-section__image-panel-top" />
              </div>
              <div className="team-section__image-bottom-wrapper">
                <div className="team-section__stars-icon">
                  <Icon name="BlueStars" />
                </div>
                <div className="team-section__image-container-bottom">
                  <img className="team-section__image-bottom" src="/assets/images/comersTeach2.png" alt="Команда" />
                  <div className="team-section__image-panel-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About