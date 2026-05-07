import { useState, useEffect, useRef } from 'react'

export const useOverlayMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = '' 
    }
  }, [isOpen])

  return { headerRef, isOpen, toggleMenu, closeMenu }
}