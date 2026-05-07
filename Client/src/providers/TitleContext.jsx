import { createContext, useEffect } from 'react'

const TitleContext = createContext()

export function TitleProvider({ children }) {
  return (
    <TitleContext.Provider value={{}}>
      {children}
    </TitleContext.Provider>
  )
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default TitleContext