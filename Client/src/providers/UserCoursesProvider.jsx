import { createContext, useState } from "react"

export const UserCoursesContext = createContext()

export const UserCoursesProvider = ({children}) => {

    const [payOpen, setPayOpen] = useState(false)
    const [userCourseData, setUserCourseData] = useState({})
    const [currentCourseId, setCurrentCourseId] = useState(null)

    const getData = (courseId) => {
        const localData = localStorage.getItem("user")

        const parsedData = JSON.parse(localData)
        const userId = parsedData.id

        const data = { user_id: userId, course_id: courseId }

        setUserCourseData(data)

        return data
    }

    return (
        <UserCoursesContext.Provider value={{
            payOpen,
            userCourseData,
            currentCourseId,
            setPayOpen,
            getData,
            setCurrentCourseId
        }}>
            {children}
        </UserCoursesContext.Provider>
    )
}