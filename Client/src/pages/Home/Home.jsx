import { useTitle } from '../../providers/TitleContext'
import './Home.scss'
import MainHero from '@/widgets/MainHero/MainHero'
import About from '@/widgets/About/About'
import Audience from '@/widgets/Audience/Audience'
import Icon from '@/shared/Icon/Icon'

const Home = () => {

  useTitle("MegaSkills | Главная")

  return (
    <>
      <MainHero />
      <About
        titleNode={
          <>
            Почему 1С это 
            <span className="info__header-span">
              <div className="info__header-star">
                <Icon name="GreenStarShadow" />
              </div>
              лучший выбор
            </span> 
            на сегодняшний день?
          </>
        }
        variant="list"
        image="/assets/images/city.jpg"
        items={[
          {
            title: "Гарантированная востребованность и стабильность",
            text: "Более 80% компаний в России и СНГ используют 1С, формируя огромный и стабильный рынок труда, независимый от IT-трендов. Спрос на специалистов высок, а профессия будет всегда актуальна."
          },
          {
            title: "Низкий порог входа и быстрый старт карьеры",
            text: "В отличие от других IT-сфер, 1С не требует высшей математики или сложных алгоритмов, а её интуитивная логика доступна даже с гуманитарным образованием."
          },
          {
            title: "Высокий доход и четкий карьерный рост",
            text: "Профессия 1С-специалиста — одна из самых высокооплачиваемых ниш в IT для начинающих. Зарплата растет с опытом и освоением конфигураций (Бухгалтерия, ЗУП, УТ, ERP)."
          },
        ]}
      />
      <Audience />
    </>
  )
}

export default Home