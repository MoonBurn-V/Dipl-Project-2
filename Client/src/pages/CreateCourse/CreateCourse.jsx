import './CreateCourse.scss'
import { HeroSecondary } from '@/widgets/HeroSecondary/HeroSecondary'
import { useTitle } from '@/providers/TitleContext'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useToggleSelect } from '@/shared/lib/hooks/useToggleSelect'
import { useCreateCourse } from '@/features/createCourse/model/useCreateCourse'
import { useCreateLesson } from '@/features/createCourse/model/useCreateLesson'
import { useCreateTest } from '@/features/createCourse/model/useCreateTest'
import { useFinishCourse } from '@/features/createCourse/model/useFinishCourse'
import LessonForm from '@/features/createCourse/ui/LessonForm'
import TestForm from '@/features/createCourse/ui/TestForm'
import FloatingActionBar from '@/features/createCourse/ui/FloatingActionBar'
import { useAuth } from '@/providers/AuthContext'

const CreateCourse = () => {
    const { user } = useAuth()
    const fileInputRef = useRef(null)
    const audienceSelectId = 'course-audience'
    const levelSelectId = 'course-level'
    const audienceOptions = ['Для пользователей', 'Для программистов', 'Для администраторов']
    const levelOptions = ['Лёгкий', 'Средний', 'Сложный']
    const audienceSelect = useToggleSelect()
    const levelSelect = useToggleSelect()
    const [previewImage, setPreviewImage] = useState('')
    const [lessonForms, setLessonForms] = useState([])
    const [lessons, setLessons] = useState([])
    const [testForms, setTestForms] = useState([])
    const [tests, setTests] = useState([])
    const [testQuestionsCount, setTestQuestionsCount] = useState(0)
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        shortDescription: '',
        description: '',
        audience: 'Для пользователей',
        level: 'Лёгкий',
        image: null,
        creatorId: user?.id ?? ''
    })
    const { courseId, loading, error, fetchCreate } = useCreateCourse()
    const { error: lessonError, fetchCreate: fetchCreateLesson } = useCreateLesson()
    const { error: testError, fetchCreate: fetchCreateTest } = useCreateTest()
    const { error: finishError, fetchFinish } = useFinishCourse()

    useTitle('MegaSkills | Создание курса')

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage)
            }
        }
    }, [previewImage])

    useEffect(() => {
        if (!user?.id) return
        setFormData((prev) => ({ ...prev, creatorId: user.id }))
    }, [user?.id])

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (previewImage) {
            URL.revokeObjectURL(previewImage)
        }

        handleChange('image', file)
        setPreviewImage(URL.createObjectURL(file))
    }

    const formDisable = 
        !formData.creatorId ||
        !formData.title.trim() || 
        !formData.shortDescription.trim() || 
        !formData.description.trim()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formDisable) return
        await fetchCreate(formData)
    }

    const handleLessonCreate = async (lessonData) => {
        try {
            await fetchCreateLesson(lessonData, courseId)
            const lessonIndex = lessonForms.length - 1
            setLessons(prev => [...prev, { ...lessonData, id: Date.now() }])
            setLessonForms(prev => {
                const updated = [...prev]
                updated[lessonIndex] = { ...updated[lessonIndex], completed: true }
                return updated
            })
        } catch (e) {
            console.error('Ошибка при создании урока:', e)
        }
    }

    const handleCancelLesson = (formId) => {
        setLessonForms(prev => prev.filter(form => form.id !== formId))
    }

    const handleSubmitLesson = (formId) => {
        const form = lessonForms.find(f => f.id === formId)
        form?.ref?.current?.submit()
    }

    const handleShowLessonForm = () => {
        const newFormId = Date.now()
        const formRef = { current: null }
        setLessonForms(prev => [...prev, { 
            id: newFormId, 
            orderNumber: lessons.length + 1,
            completed: false,
            ref: formRef
        }])
    }

    const handleFinishCourse = async () => {
        try {
            if (!courseId) {
                console.error('ID курса отсутствует')
                return
            }
            await fetchFinish(courseId)
            alert('Курс успешно завершен!')
        } catch (e) {
            console.error('Ошибка при завершении курса:', e)
        }
    }

    const handleCreateTest = () => {
        const newTestFormId = Date.now()
        const testFormRef = { current: null }
        const orderNumber = lessons.length + tests.length + 1
        setTestForms(prev => [...prev, {
            id: newTestFormId,
            orderNumber: orderNumber,
            completed: false,
            ref: testFormRef
        }])
        setTestQuestionsCount(0)
    }

    const handleTestQuestionsChange = (count) => {
        setTestQuestionsCount(count)
    }

    const handleTestCreate = async (testData) => {
        try {
            const testIndex = testForms.findIndex(f => !f.completed)
            if (testIndex === -1) {
                console.error('Не найдена активная форма теста')
                return
            }

            const orderNumber = testForms[testIndex].orderNumber
            
            await fetchCreateTest(testData, courseId, orderNumber)
            
            setTests(prev => [...prev, { ...testData, id: Date.now() }])
            setTestForms(prev => {
                const updated = [...prev]
                updated[testIndex] = { ...updated[testIndex], completed: true }
                return updated
            })
            setTestQuestionsCount(0)
        } catch (e) {
            console.error('Ошибка при создании теста:', e)
        }
    }

    const handleCancelTest = (testFormId) => {
        setTestForms(prev => prev.filter(form => form.id !== testFormId))
        setTestQuestionsCount(0)
    }

    const handleSubmitTest = (testFormId) => {
        const form = testForms.find(f => f.id === testFormId)
        form?.ref?.current?.submit()
    }

    const renderSelect = ({
        label,
        id,
        value,
        options,
        onSelect,
        selectState
    }) => (
        <div className="field-light">
            <label className="field-light__label" htmlFor={id}>
                {label}
            </label>
            <div className="field-light__input-wrapper">
                <div className="create-course__select" ref={selectState.selectRef}>
                    <button
                        id={id}
                        type="button"
                        className="create-course__select-trigger"
                        role="combobox"
                        aria-expanded={selectState.isOpen}
                        aria-haspopup="listbox"
                        aria-controls={`${id}-listbox`}
                        onClick={selectState.toggleList}
                    >
                        <span>{value}</span>
                        <span
                            className={clsx('create-course__select-icon', {
                                open: selectState.isOpen
                            })}
                        >
                            <Icon name="Chevron" />
                        </span>
                    </button>

                    <div
                        id={`${id}-listbox`}
                        role="listbox"
                        className={clsx('create-course__select-dropdown', {
                            open: selectState.isOpen
                        })}
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={value === option}
                                className={clsx('create-course__select-option', {
                                    active: value === option
                                })}
                                onClick={() => {
                                    onSelect(option)
                                    selectState.toggleList()
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <HeroSecondary
                type="courseTitle"
                subtitle="Панель преподавателя"
                title="Создание курса"
            />

            <section className="create-course">
                <div className="create-course__container container">
                    <form className="create-course__form" onSubmit={handleSubmit}>
                        <h2 className="create-course__form-title">Данные карточки курса</h2>

                        <div className="create-course__top-row">
                            <div className="create-course__image-preview">
                                <img
                                    src={previewImage || '/assets/images/course-no-photo.png'}
                                    alt="Превью курса"
                                    className="create-course__image"
                                />
                            </div>

                            <div className="create-course__top-fields">
                                <div className="field-light">
                                    <label className="field-light__label" htmlFor="course-title">
                                        Название курса
                                    </label>
                                    <div className="field-light__input-wrapper">
                                        <input
                                            id="course-title"
                                            className="field-light__input"
                                            type="text"
                                            placeholder="Введите название курса"
                                            value={formData.title}
                                            onChange={(event) => handleChange('title', event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field-light">
                                    <label className="field-light__label" htmlFor="course-price">
                                        Цена
                                    </label>
                                    <div className="field-light__input-wrapper">
                                        <input
                                            id="course-price"
                                            className="field-light__input"
                                            type="number"
                                            min="0"
                                            step="500"
                                            placeholder="Введите цену"
                                            value={formData.price}
                                            onChange={(event) => handleChange('price', event.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button
                                    className="create-course__upload-button menu-button blue"
                                    onClick={handleImageClick}
                                    type="button"
                                >
                                    Выбрать изображение
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="create-course__file-input"
                                />
                            </div>
                        </div>

                        <div className="create-course__details-row">
                            <div className="create-course__descriptions">
                                <div className="field-light">
                                    <label className="field-light__label" htmlFor="course-short-description">
                                        Мини описание
                                    </label>
                                    <div className="field-light__input-wrapper">
                                        <input
                                            id="course-short-description"
                                            className="field-light__input"
                                            type="text"
                                            placeholder="Кратко опишите курс"
                                            value={formData.shortDescription}
                                            onChange={(event) => handleChange('shortDescription', event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field-light">
                                    <label className="field-light__label" htmlFor="course-description">
                                        Полное описание
                                    </label>
                                    <div className="field-light__input-wrapper">
                                        <textarea
                                            id="course-description"
                                            className="create-course__textarea"
                                            placeholder="Подробно расскажите о курсе"
                                            value={formData.description}
                                            onChange={(event) => handleChange('description', event.target.value)}
                                            rows="6"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="create-course__selectors">
                                {renderSelect({
                                    label: 'Для кого курс',
                                    id: audienceSelectId,
                                    value: formData.audience,
                                    options: audienceOptions,
                                    onSelect: (option) => handleChange('audience', option),
                                    selectState: audienceSelect
                                })}

                                {renderSelect({
                                    label: 'Сложность',
                                    id: levelSelectId,
                                    value: formData.level,
                                    options: levelOptions,
                                    onSelect: (option) => handleChange('level', option),
                                    selectState: levelSelect
                                })}
                            </div>
                        </div>

                        <div className="create-course__actions"></div>
                        {error && <p className="create-course__error">{error}</p>}
                    </form>

                    {lessonForms.map((lessonForm) => (
                        <div key={lessonForm.id}>
                            <LessonForm
                                ref={lessonForm.ref}
                                courseId={courseId}
                                onLessonCreate={handleLessonCreate}
                                onCancel={() => handleCancelLesson(lessonForm.id)}
                                orderNumber={lessonForm.orderNumber}
                                disabled={lessonForm.completed}
                            />
                        </div>
                    ))}
                    {lessonError && <p className="create-course__error">{lessonError}</p>}

                    {testForms.map((testForm) => (
                        <div key={testForm.id}>
                            <TestForm
                                ref={testForm.ref}
                                onTestCreate={handleTestCreate}
                                onCancel={() => handleCancelTest(testForm.id)}
                                onQuestionsChange={handleTestQuestionsChange}
                                disabled={testForm.completed}
                            />
                        </div>
                    ))}

                    {testError && <p className="create-course__error">{testError}</p>}

                    {finishError && <p className="create-course__error">{finishError}</p>}
                </div>
                <FloatingActionBar
                    showCourseButton={!courseId}
                    courseButtonDisabled={formDisable}
                    courseButtonLoading={loading}
                    onSubmitCourse={handleSubmit}
                    showAddLessonButton={courseId && (lessonForms.length === 0 || lessonForms.every(f => f.completed))}
                    addLessonButtonDisabled={false}
                    onAddLesson={handleShowLessonForm}
                    showSubmitLessonButton={lessonForms.length > 0 && lessonForms.some(f => !f.completed)}
                    lessonButtonDisabled={false}
                    onSubmitLesson={() => {
                        const incompleteForm = lessonForms.find(f => !f.completed)
                        if (incompleteForm) handleSubmitLesson(incompleteForm.id)
                    }}
                    showCreateTestButton={courseId && lessons.length > 0 && (testForms.length === 0 || testForms.every(f => f.completed))}
                    onCreateTest={handleCreateTest}
                    showSubmitTestButton={testForms.length > 0 && testForms.some(f => !f.completed)}
                    testButtonDisabled={testQuestionsCount === 0}
                    onSubmitTest={() => {
                        const incompleteForm = testForms.find(f => !f.completed)
                        if (incompleteForm) handleSubmitTest(incompleteForm.id)
                    }}
                    showFinishCourseButton={courseId && lessons.length > 0}
                    onFinishCourse={handleFinishCourse}
                    showAddLessonButtonAfterComplete={courseId && lessons.length > 0}
                />
            </section>
        </>
    )
}

export default CreateCourse