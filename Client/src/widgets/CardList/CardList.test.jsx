import React from 'react';
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CardList } from './CardList'

describe('Test CardList', () => {
    let res

    beforeEach(() => {
        res = {
            "count": 26,
            "rows": [
                {
                    "id": 7,
                    "title": "1С для бухгалтеров",
                    "price": "3500.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Практический курс по работе бухгалтеров в 1С.",
                    "mini_description": "Практический курс по работе бухгалтеров в 1С.",
                    "number_lessons": 6,
                    "image": null,
                    "rating": "4.70",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 8,
                    "title": "Кадровый учёт в 1С",
                    "price": "3000.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Ведение кадрового учёта и документов в 1С.",
                    "mini_description": "Ведение кадрового учёта и документов в 1С.",
                    "number_lessons": 5,
                    "image": null,
                    "rating": "4.50",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 9,
                    "title": "Зарплата и кадры",
                    "price": "4000.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Расчёт заработной платы в 1С.",
                    "mini_description": "Расчёт заработной платы в 1С.",
                    "number_lessons": 7,
                    "image": null,
                    "rating": "4.60",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 5,
                    "title": "Введение в 1С",
                    "price": null,
                    "difficulty": "Лёгкий",
                    "type": "Для пользователей",
                    "description": "Это базовый курс для начинающих пользователей, работающих с учетными системами, в первую очередь для бухгалтеров, экономистов, кадровых специалистов и других сотрудников, использующих 1С в повседневной работе.\n\nКурс предназначен для тех, кто только начинает знакомство с программами 1С или хочет систематизировать уже имеющиеся знания. В теоретической части рассматриваются основы платформы 1С с точки зрения пользователя: назначение и возможности системы, структура интерфейса, основные объекты и принципы работы, навигация, ввод и просмотр данных, а также общая логика работы в типовых конфигурациях.\n\nПосле изучения теории участники проходят тест, который помогает закрепить материал и проверить понимание ключевых понятий и принципов работы в 1С.\n\nПо итогам курса участник будет понимать, как устроена платформа 1С, уверенно ориентироваться в интерфейсе и осознанно выполнять базовые пользовательские операции, необходимые для дальнейшей работы или изучения более специализированных курсов.",
                    "mini_description": "Базовый курс для пользователей 1С: знакомство с платформой, интерфейсом и принципами работы.",
                    "number_lessons": 3,
                    "image": null,
                    "rating": "4.50",
                    "status": "Готов",
                    "created_date": "2025-12-30T10:45:44.653Z",
                    "createdAt": "2025-12-30T10:45:44.653Z",
                    "updatedAt": "2025-12-30T10:45:44.653Z",
                    "creator_id": 1
                },
                {
                    "id": 10,
                    "title": "1С: управление торговлей",
                    "price": "5000.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Учёт продаж, закупок и складов.",
                    "mini_description": "Учёт продаж, закупок и складов.",
                    "number_lessons": 8,
                    "image": null,
                    "rating": "4.70",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 11,
                    "title": "Первичные документы в 1С",
                    "price": null,
                    "difficulty": "Лёгкий",
                    "type": "Для пользователей",
                    "description": "Работа с накладными, счетами и актами.",
                    "mini_description": "Работа с накладными, счетами и актами.",
                    "number_lessons": 4,
                    "image": null,
                    "rating": "4.40",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 12,
                    "title": "Отчёты в 1С",
                    "price": "2500.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Формирование и анализ отчётов.",
                    "mini_description": "Формирование и анализ отчётов.",
                    "number_lessons": 5,
                    "image": null,
                    "rating": "4.50",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 13,
                    "title": "1С для начинающих пользователей",
                    "price": null,
                    "difficulty": "Лёгкий",
                    "type": "Для пользователей",
                    "description": "Стартовый курс для новичков.",
                    "mini_description": "Стартовый курс для новичков.",
                    "number_lessons": 3,
                    "image": null,
                    "rating": "4.60",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                },
                {
                    "id": 14,
                    "title": "Учет ТМЦ в 1С",
                    "price": "3200.00",
                    "difficulty": "Средний",
                    "type": "Для пользователей",
                    "description": "Учёт материальных ценностей.",
                    "mini_description": "Учёт материальных ценностей.",
                    "number_lessons": 6,
                    "image": null,
                    "rating": "4.50",
                    "status": "Готов",
                    "created_date": "2025-12-30T12:10:42.588Z",
                    "createdAt": "2025-12-30T12:10:42.588Z",
                    "updatedAt": "2025-12-30T12:10:42.588Z",
                    "creator_id": 1
                }
            ]
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(res)
            })
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('render course cards', async () => {
        render(
            <MemoryRouter>
                <CardList coursesData={res} loading={false} error={false} />
            </MemoryRouter>
        )
        const cards = await screen.findAllByTestId('course-card')
        expect(cards.length).toBe(9)
        screen.debug()
    })

    test('render course button', async () => {
        render(
            <MemoryRouter>
                <CardList coursesData={res} loading={false} error={false} />
            </MemoryRouter>
        )
        const buttons = await screen.findAllByTestId('course-button')
        expect(buttons.length).toBe(9)
        screen.debug()
    })
})