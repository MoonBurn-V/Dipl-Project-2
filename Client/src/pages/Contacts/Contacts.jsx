import { useEffect, useRef } from 'react'
import { useTitle } from '../../providers/TitleContext'
import { HeroSecondary } from '../../widgets/HeroSecondary/HeroSecondary'
import './Contacts.scss'

const Contacts = () => {
  useTitle("MegaSkills | Контакты")
  const mapRef = useRef(null)

  useEffect(() => {
    // 1. Создаем тег скрипта для загрузки API Яндекс Карт
    const script = document.createElement('script')
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU"
    script.type = "text/javascript"
    document.head.appendChild(script)

    script.onload = () => {
      // 2. Ждем, пока API полностью готово к работе
      window.ymaps.ready(() => {
        if (!mapRef.current) return

        // Очищаем контейнер перед созданием новой карты (важно для React)
        mapRef.current.innerHTML = ''

        // 3. Инициализируем карту
        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.805796, 38.996486], // Твои точные координаты здания
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl']
        })

        // 4. Создаем ТУ САМУЮ КРАСНУЮ МЕТКУ
        const placemark = new window.ymaps.Placemark(
          [55.805796, 38.996486], 
          {
            balloonContentHeader: 'МегаСкиллс',
            balloonContentBody: 'МО, г. Орехово-Зуево, ул. Лапина, д. 78'
          },
          {
            preset: 'islands#redDotIcon' // Вот она, красная точка!
          }
        )

        map.geoObjects.add(placemark)
      })
    }

    // Чистим скрипт при размонтировании компонента
    return () => {
      script.remove()
    }
  }, [])

  const contactsList = [
    { id: 1, label: 'Телефон', value: '8 (495) 180-49-77' },
    { id: 2, label: 'Email', value: 'zakaz@itsale.ru' },
    { id: 3, label: 'Часы работы', value: 'ПН-ПТ с 9:00 до 18:00' },
    { id: 4, label: 'Адрес', value: 'МО, г. Орехово-Зуево, ул. Лапина, д. 78' }
  ]

  return (
    <>
      <HeroSecondary title={'Контактные данные'} subtitle={'Наши'} type="courseTitle" />
      <section className="contacts-section">
        <div className="contacts-container">
          <div className="contacts-block">
            <h2 className="contacts-title">Наши контакты</h2>
            <ul className="contacts-list">
              {contactsList.map((contact) => (
                <li key={contact.id} className="contact-item">
                  <div className="contact-item-header">
                    <span className="contact-label">{contact.label}</span>
                  </div>
                  {contact.id === 1 ? (
                    <a href="tel:+74951804977" className="contact-value">{contact.value}</a>
                  ) : contact.id === 2 ? (
                    <a href="mailto:zakaz@itsale.ru" className="contact-value">{contact.value}</a>
                  ) : (
                    <p className="contact-value">{contact.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Вместо компонентов библиотеки используем обычный div с ref */}
          <div className="map-block">
            <div ref={mapRef} className="yandex-map" style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacts