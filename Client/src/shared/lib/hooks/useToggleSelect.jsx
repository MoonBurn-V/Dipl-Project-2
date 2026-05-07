import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

export const useToggleSelect = () => {

    const [isOpen, setIsOpen] = useState(false)

    const dropdownClasses = clsx('select__dropdown', {
        open: isOpen,
    })

    const iconClasses = clsx('select__icon', {
        open: isOpen,
    })

    const selectRef = useRef(null)

    const toggleList = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return { dropdownClasses, iconClasses, selectRef, toggleList, isOpen }
}