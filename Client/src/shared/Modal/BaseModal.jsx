import './BaseModal.scss'
import { useEffect } from 'react'
import { CloseModalButton } from "../CloseModalButton/CloseModalButton"


export const BaseModal = ({ isOpen, onClose, title, children }) => {

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  const handelOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }
  
  if (!isOpen) return null

  return (
    <section className="modal" onClick={handelOverlayClick}>
      <div className="modal__inner">
        <CloseModalButton onClick={onClose} />
        
        {title && (
          <div className="modal__title h2">
            {title}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}