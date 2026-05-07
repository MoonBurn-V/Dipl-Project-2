export const getAdjacentLessons = (lessons, orderNumber) => {
  if (!lessons?.length) return { prev: null, next: null }

  const sorted = [...lessons].sort(
    (a, b) => a.order_number - b.order_number
  )

  const index = sorted.findIndex(
    l => l.order_number === orderNumber
  )

  return {
    prev: sorted[index - 1] || null,
    next: sorted[index + 1] || null,
  }
}