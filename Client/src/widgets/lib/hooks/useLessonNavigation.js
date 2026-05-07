import { useContext, useMemo } from "react"
import { TestResultContext } from "@/providers/TestResultProvider"
import { getAdjacentLessons } from "../utils/getAdjacentLessons"

export const useLessonNavigation = (lessons, orderNumber) => {
  const { testPassed } = useContext(TestResultContext)

  const { prev, next } = useMemo(() => 
    getAdjacentLessons(lessons, orderNumber),
  [lessons, orderNumber])

  const canGoNext = next || testPassed === true

  return {
    prev,
    next,
    canGoNext
  }
}