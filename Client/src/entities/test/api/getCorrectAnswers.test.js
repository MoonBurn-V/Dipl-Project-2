import { getCorrectAnswers } from "./getCorrectAnswers";

describe('Получение верных ответов', () => {
    let res

    beforeEach(() => {
        res = {
            "4": 1,
            "5": 4,
            "6": 8,
            "7": 12,
            "8": 14,
            "9": [16, 18],
            "10": [21, 22],
            "11": "результат"
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

    test('Ожидаемый вывод', async () => {
        const lessonId = 6

        const result = await getCorrectAnswers(lessonId)

        expect(fetch).toHaveBeenCalledWith(
            `/api/test/correct-answers/${lessonId}`,
            { method: 'GET' }
        )

        expect(result).toEqual(res)
    })
})