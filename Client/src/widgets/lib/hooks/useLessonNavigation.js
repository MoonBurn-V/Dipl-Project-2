import { useContext, useMemo } from "react"
import { TestResultContext } from "@/providers/TestResultProvider"
import { getAdjacentLessons } from "../utils/getAdjacentLessons"

export const useLessonNavigation = (lessons, orderNumber) => {
  const { testPassed } = useContext(TestResultContext)

  const { prev, next } = useMemo(() => 
    getAdjacentLessons(lessons || [], orderNumber),
  [lessons, orderNumber])

  if (!lessons || lessons.length === 0) {
    return {
      prev: null,
      next: null,
      canGoNext: false
    }
  }

  let canGoNext = true

  if (lessons[orderNumber - 1]?.test === 'да') {
    canGoNext = testPassed === true
  }

  return {
    prev,
    next,
    canGoNext
  }
}