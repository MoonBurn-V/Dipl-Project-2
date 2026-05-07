import React from 'react';
import './CardList.scss'
import clsx from 'clsx'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import { ServerError } from '@/widgets/ServerError/ServerError'
import { CardListSkeleton } from '../CardListSkeleton/CardListSkeleton'

export const CardList = ({ coursesData, loading, error }) => {

  const courses = coursesData?.rows || []

  if (loading) return <CardListSkeleton/>
  if (error) return (<ServerError loading={loading} error={error}/>)

  return (
    <div className="card-list">
      {courses.map(({ id, title, price, mini_description, type, image, rating, difficulty }) => {

        const complexityClasses = clsx('course-card__complexity', {
          green: difficulty === 'Лёгкий',
          orange: difficulty === 'Средний',
          red: difficulty === 'Сложный',
        })

        const defaultImagesByType = {
          'Для пользователей': 'card-user.jpeg',
          'Для программистов': 'card-programmist.jpg',
          'Для администраторов': 'card-admin.jpg',
        }

        const imagePath = image 
        ? `/static/images/${image}` 
        :  `/assets/images/${defaultImagesByType[type]}`
        
        const priceText = price == null ? 'Бесплатно' : `${price.split('.')[0]} p`

        return (
          <div className="course-card" key={id} data-testid="course-card">
            <img className='course-card__image' src={imagePath} alt={title} />
            <div className="course-card__title h4">{title}</div>

            <div className="course-card__price">{priceText}</div>

            <div className={complexityClasses}>{difficulty}</div>
            <div className="course-card__description">{mini_description}</div>

            <div className="course-card__wrapper">
              <Button to={`/courses/${id}`} className="menu-button blue" data-testid="course-button">
                Подробнее
              </Button>
              <div className="course-card__rating">
                <Icon name="GoldStar" />
                <div className="course-card__number">{rating}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}