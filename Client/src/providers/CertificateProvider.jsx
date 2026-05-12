import { createContext, useState } from "react";

export const CertificateContext = createContext()

export const CertificateProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [courseId, setCourseId] = useState(null)

    const openModal = (id) => {
        setCourseId(id)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setCourseId(null)
    }

    return (
        <CertificateContext.Provider value={{
            isOpen,
            courseId,
            openModal,
            closeModal,
            setIsOpen
        }}>
            {children}
        </CertificateContext.Provider>
    )
}
