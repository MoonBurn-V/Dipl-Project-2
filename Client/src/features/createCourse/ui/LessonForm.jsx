import './LessonForm.scss'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'
import clsx from 'clsx'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'

const LessonForm = forwardRef(({ onLessonCreate, onCancel, orderNumber, disabled = false }, ref) => {
    const videoInputRef = useRef(null)
    const [lessonTitle, setLessonTitle] = useState('')
    const [paragraphTitle, setParagraphTitle] = useState('')
    const [paragraphText, setParagraphText] = useState('')
    const [paragraphs, setParagraphs] = useState([])
    const [video, setVideo] = useState(null)
    const [videoName, setVideoName] = useState('')

    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(new Event('submit'))
            return lessonTitle.trim() && paragraphs.length > 0
        },
        canSubmit: lessonTitle.trim() && paragraphs.length > 0
    }))

    const handleAddParagraph = () => {
        if (!paragraphTitle.trim() || !paragraphText.trim()) {
            return
        }

        const newParagraph = {
            id: Date.now(),
            title: paragraphTitle.trim(),
            text: paragraphText.trim()
        }

        setParagraphs([...paragraphs, newParagraph])
        setParagraphTitle('')
        setParagraphText('')
    }

    const handleDeleteParagraph = (id) => {
        setParagraphs(paragraphs.filter(p => p.id !== id))
    }

    const handleVideoClick = () => {
        videoInputRef.current?.click()
    }

    const handleVideoChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.includes('video')) {
            return
        }

        setVideo(file)
        setVideoName(file.name)
    }

    const handleSubmit = (event) => {
        event?.preventDefault()

        if (!lessonTitle.trim() || paragraphs.length === 0) {
            return
        }

        const content = paragraphs
            .map(p => `#${p.title}#${p.text.replace(/\n\n/g, '\\n\\n')}`)
            .join('')

        const lessonData = {
            title: lessonTitle.trim(),
            content: content,
            video: video,
            orderNumber: orderNumber,
            status: 'В разработке',
            test: 'нет'
        }

        onLessonCreate(lessonData)
    }

    const canAddParagraph = paragraphTitle.trim() && paragraphText.trim()

    return (
        <div className="lesson-form">
            <h2 className="lesson-form__title">Создание урока</h2>

            <div className="lesson-form__main-field">
                <div className="field-light">
                    <label className="field-light__label" htmlFor="lesson-title">
                        Название урока
                    </label>
                    <div className="field-light__input-wrapper">
                        <input
                            id="lesson-title"
                            className="field-light__input"
                            type="text"
                            placeholder="Введите название урока"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            disabled={disabled}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="lesson-form__paragraphs">

                <div className="lesson-form__paragraph-form">
                    <div className="field-light">
                        <label className="field-light__label" htmlFor="paragraph-title">
                            Название абзаца
                        </label>
                        <div className="field-light__input-wrapper">
                            <input
                                id="paragraph-title"
                                className="field-light__input"
                                type="text"
                                placeholder="Введите название абзаца"
                                value={paragraphTitle}
                                onChange={(e) => setParagraphTitle(e.target.value)}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    <div className="field-light">
                        <label className="field-light__label" htmlFor="paragraph-text">
                            Текст абзаца
                        </label>
                        <div className="field-light__input-wrapper">
                            <textarea
                                id="paragraph-text"
                                className="lesson-form__textarea"
                                placeholder="Введите текст абзаца"
                                value={paragraphText}
                                onChange={(e) => setParagraphText(e.target.value)}
                                disabled={disabled}
                                rows="4"
                            />
                        </div>
                    </div>

                    <Button
                        className={clsx("lesson-form__add-button menu-button", {
                            blue: canAddParagraph && !disabled,
                            hover: !canAddParagraph || disabled
                        })}
                        type="button"
                        onClick={handleAddParagraph}
                        disabled={!canAddParagraph || disabled}
                    >
                        Добавить абзац
                    </Button>
                </div>

                {paragraphs.length > 0 && (
                    <div className="lesson-form__paragraphs-list">
                        <h5 className="field-light__label">Добавленные абзацы:</h5>
                        <div className="lesson-form__paragraphs-items">
                            {paragraphs.map((paragraph) => (
                                <div key={paragraph.id} className="lesson-form__paragraph-item">
                                    <div className="lesson-form__paragraph-content">
                                        <h6 className="lesson-form__paragraph-item-title">
                                            {paragraph.title}
                                        </h6>
                                        <p className="lesson-form__paragraph-item-text">
                                            {paragraph.text}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="lesson-form__delete-button"
                                        onClick={() => handleDeleteParagraph(paragraph.id)}
                                        disabled={disabled}
                                        title="Удалить абзац"
                                    >
                                        <Icon name="Close" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="lesson-form__media">
                <div className="lesson-form__video-section">
                    <h4 className="field-light__label">Видео</h4>
                    {videoName ? (
                        <div className="lesson-form__video-selected">
                            <span className="lesson-form__video-name">{videoName}</span>
                            <button
                                type="button"
                                className="lesson-form__video-remove"
                                onClick={() => {
                                    setVideo(null)
                                    setVideoName('')
                                }}
                                disabled={disabled}
                                title="Удалить видео"
                            >
                                <Icon name="Close" />
                            </button>
                        </div>
                    ) : (
                        <p className="lesson-form__no-video">Видео не добавлено</p>
                    )}
                    <Button
                        className="lesson-form__video-button menu-button blue"
                        type="button"
                        onClick={handleVideoClick}
                        disabled={disabled}
                    >
                        Добавить видео
                    </Button>
                    <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="lesson-form__file-input"
                    />
                </div>
            </div>
        </div>
    )
})

LessonForm.displayName = 'LessonForm'

export default LessonForm
