const { Tests, Questions, Answers } = require('../models/models')

class TestController {
    async create(req, res) {
        const { passing_percentage, status, lesson_id, questions } = req.body
        
        // Создаем тест с lesson_id
        const test = await Tests.create({ 
            passing_percentage, 
            status,
            lesson_id
        })

        // Создаем вопросы и ответы
        if (questions && Array.isArray(questions)) {
            for (const questionData of questions) {
                const question = await Questions.create({
                    text: questionData.text,
                    type: questionData.type,
                    test_id: test.id
                })

                if (questionData.type === 'text') {
                    // Для текстовых вопросов создаем один ответ
                    await Answers.create({
                        text: questionData.answer,
                        is_correct: true,
                        question_id: question.id
                    })
                } else {
                    // Для single и multiple создаем все варианты ответов
                    const correctAnswerIds = questionData.correctAnswers || []
                    for (let i = 0; i < questionData.answers.length; i++) {
                        await Answers.create({
                            text: questionData.answers[i],
                            is_correct: correctAnswerIds.includes(i),
                            question_id: question.id
                        })
                    }
                }
            }
        }

        // Возвращаем тест с всеми связанными данными
        const createdTest = await Tests.findOne({
            where: { id: test.id },
            include: [
                {
                    model: Questions,
                    include: [
                        {
                            model: Answers
                        }
                    ]
                }
            ]
        })

        return res.json(createdTest)
    }

    async check(req, res) {
        const { lessonId, answers } = req.body
        const test = await Tests.findOne({
            where: { lesson_id: lessonId },
            include: [
                {
                    model: Questions,
                    include: [
                        {
                            model: Answers
                        }
                    ]
                }
            ]
        })

        const correctAnswers = test.Questions.map(question => ({
            questionId: question.id,
            type: question.type,
            correctAnswers: question.Answers.filter(answer => answer.is_correct).map(answer => answer.id),
            correctText: question.Answers.find(answer => answer.is_correct)?.text
        }))

        let correctCount = 0

        answers.forEach(userAnswer => {
            const question = correctAnswers.find(q => q.questionId === userAnswer.questionId)

            if (!question) return

            if (question.type === "single") {
                if (userAnswer.value === question.correctAnswers[0]) {
                    correctCount ++ 
                }
            }

            if (question.type === "multiple") {
                const userValues = userAnswer.value.sort()
                const correctValues = question.correctAnswers.sort()

                if (userValues.length === correctValues.length && 
                    userValues.every(v => correctValues.includes(v))) {
                    
                    correctCount++
                }
            }

            if (question.type === "text") {
                if (userAnswer.value?.trim().toLowerCase() === question.correctText.trim().toLowerCase()) {
                    correctCount++
                }
            }
        })

        const totalQuestions = correctAnswers.length
        const percent = (correctCount / totalQuestions) * 100

        const result = {
            userPercent: percent,
            testPassed: percent >= test.passing_percentage,
            numberQuestions: totalQuestions,
            numberCorrectUserAnswers: correctCount
        }

        return res.json(result)
    }

    async getCorrectAnswers(req, res) {
        const { lessonId } = req.params

        const test = await Tests.findOne({
            where: { lesson_id: lessonId },
            include: [
                {
                    model: Questions,
                    include: [
                        {
                            model: Answers
                        }
                    ]
                }
            ]
        })

        const correctAnswers = {}

        test.Questions.forEach(question => {
            const correct = question.Answers.filter(a => a.is_correct)

            if (question.type === 'single') {
                correctAnswers[question.id] = correct[0]?.id
            }

            if (question.type === 'multiple') {
                correctAnswers[question.id] = correct.map(a => a.id)
            }

            if (question.type === 'text') {
                correctAnswers[question.id] = correct[0]?.text
            }
        })

        return res.json(correctAnswers)
    }


    async getByLesson(req, res) {
        const {lessonId} = req.params

        const test = await Tests.findOne({
            where: { lesson_id: lessonId },
            include: [
                {
                    model: Questions,
                    include: [
                        {
                            model: Answers
                        }
                    ]
                }
            ]
        })

        return res.json(test)
    }
}

module.exports = new TestController()