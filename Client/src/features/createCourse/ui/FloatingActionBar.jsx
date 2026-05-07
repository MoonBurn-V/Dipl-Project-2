import './FloatingActionBar.scss'
import Button from '@/shared/Button/Button'
import clsx from 'clsx'

const FloatingActionBar = ({
    onSubmitCourse,
    onAddLesson,
    onSubmitLesson,
    courseButtonDisabled = false,
    courseButtonLoading = false,
    addLessonButtonDisabled = false,
    lessonButtonDisabled = false,
    showCourseButton = false,
    showAddLessonButton = false,
    showSubmitLessonButton = false,
    showCreateTestButton = false,
    showSubmitTestButton = false,
    testButtonDisabled = false,
    showFinishCourseButton = false,
    onCreateTest,
    onSubmitTest,
    onFinishCourse
}) => {
    return (
        <div className="floating-action-bar">
            {showCourseButton && (
                <Button
                    className={clsx("floating-action-bar__button menu-button", {
                        blue: !courseButtonDisabled,
                        hover: courseButtonDisabled,
                    })}
                    type="button"
                    onClick={onSubmitCourse}
                    disabled={courseButtonDisabled || courseButtonLoading}
                    title="Добавить карточку курса"
                >
                    {courseButtonLoading ? 'добавление...' : 'добавить карточку'}
                </Button>
            )}

            {showAddLessonButton && (
                <Button
                    className={clsx("floating-action-bar__button menu-button", {
                        blue: !addLessonButtonDisabled,
                        hover: addLessonButtonDisabled,
                    })}
                    type="button"
                    onClick={onAddLesson}
                    disabled={addLessonButtonDisabled}
                    title="Добавить урок"
                >
                    Добавить урок
                </Button>
            )}

            {showSubmitLessonButton && (
                <Button
                    className={clsx("floating-action-bar__button menu-button", {
                        blue: !lessonButtonDisabled,
                        hover: lessonButtonDisabled,
                    })}
                    type="button"
                    onClick={onSubmitLesson}
                    disabled={lessonButtonDisabled}
                    title="Завершить создание урока"
                >
                    Завершить создание урока
                </Button>
            )}

            {showSubmitTestButton && (
                <Button
                    className={clsx("floating-action-bar__button menu-button", {
                        blue: !testButtonDisabled,
                        hover: testButtonDisabled,
                    })}
                    type="button"
                    onClick={onSubmitTest}
                    disabled={testButtonDisabled}
                    title="Завершить создание теста"
                >
                    Завершить создание теста
                </Button>
            )}

            {showCreateTestButton && !showSubmitTestButton && (
                <Button
                    className="floating-action-bar__button menu-button blue"
                    type="button"
                    onClick={onCreateTest}
                    title="Добавить тест"
                >
                    Добавить тест
                </Button>
            )}

            {showFinishCourseButton && (
                <Button
                    className="floating-action-bar__button menu-button blue"
                    type="button"
                    onClick={onFinishCourse}
                    title="Завершить создание курса"
                >
                    Завершить создание курса
                </Button>
            )}
        </div>
    )
}

export default FloatingActionBar
