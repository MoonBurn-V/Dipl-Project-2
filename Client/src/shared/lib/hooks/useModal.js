import { useEffect, useRef } from 'react'

export const useModal = (isOpen, closeModal) => {
    const modalRef = useRef()

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal()
            }
        }

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, closeModal])

    return modalRef
}