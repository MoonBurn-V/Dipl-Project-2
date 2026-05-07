import { useState, useEffect } from 'react'

export const useMobileHeight = () => {
    const [isMobileHeight, setIsMobileHeight] = useState(false)

    useEffect(() => {
        const checkHeight = () => {
            setIsMobileHeight(window.innerHeight < 830)
        }

        checkHeight()
        window.addEventListener('resize', checkHeight)

        return () => {
            window.removeEventListener('resize', checkHeight)
        }
    }, [])

    return isMobileHeight
}