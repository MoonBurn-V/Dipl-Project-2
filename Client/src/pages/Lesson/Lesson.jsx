import './Lesson.scss'
import { useTitle } from '@/providers/TitleContext'
import { useParams } from 'react-router-dom'
import { useFetchLesson } from '@/entities/lessons/model/useFetchLesson'
import { HeroSecondary } from '@/widgets/HeroSecondary/HeroSecondary'
import { Content } from '@/widgets/Content/Content'
import { Test } from '@/widgets/Test/Test'
import { LessonPagination } from '@/widgets/LessonPagination/LessonPagination'
import { ServerError } from '@/widgets/ServerError/ServerError'
import { useState, useEffect } from 'react'
import { ContentSkeleton } from '../../widgets/ContentSkeleton/ContentSkeleton'

const Lesson = () => {

    const { id: courseId, order } = useParams()
    const { data: lesson, loading, error } = useFetchLesson(`/api/lesson/by-order?course_id=${courseId}&order=${order}`)
    const [testResult, setTestResult] = useState({})

    const text = lesson?.content || ""
    const video = lesson?.video || ""

    const content = []
    const regex = /#(.*?)#([\s\S]*?)(?=#.*?#|$)/g
    let match

    while ((match = regex.exec(text)) !== null) {
        content.push({
            title: match[1].trim(),
            paragraph: match[2].replace(/\\n\\n/g, '\n\n').trim()
        })
    }

    useEffect(() => {
        if (lesson) {
            setTestResult({})
        }
    }, [lesson?.id])

    useTitle(`MegaSkills | ${lesson?.title}`)

    if (loading) return (<ContentSkeleton />)
    if (error) return (<ServerError loading={loading} error={error}/>)

    return (
        <div className="lesson">
            <HeroSecondary 
                title={lesson?.title} 
                subtitle={`УРОК: ${lesson?.order_number}`}
                type="courseTitle"
            />

            {lesson?.test === "нет" && (
                <Content 
                    content={content} 
                    video={video}
                />
            )}

            {lesson?.test === "да" && (
                <Test 
                    lessonId={lesson?.id} 
                    getTestResult={setTestResult}
                />
            )}
            <LessonPagination 
                orderNumber={lesson?.order_number} 
                courseId={lesson?.course_id}
                loading={loading}
            />
        </div>
    )
}

export default Lesson