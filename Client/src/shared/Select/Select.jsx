import './Select.scss'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useToggleSelect } from '../lib/hooks/useToggleSelect'
import Icon from '../Icon/Icon'

export const Select = ({ filterText, filterType, onChange, value }) => {

    const [selectedValue, setSelectedValue] = useState(filterText)

    const optionTypes = {
        audience: ['Для пользователей', 'Для программистов', 'Для администраторов'],
        complexity: ['Лёгкий', 'Средний', 'Сложный'],
        order: ['Самые новые', 'Рейтинг'],
    }

    useEffect (() => {
        if (filterType === "order") {
            if (value === 'date') {
                setSelectedValue('Самые новые')
            } else if (value === 'rating') {
                setSelectedValue('Рейтинг')
            }
        } else {
            if (!value) {
                setSelectedValue(filterText)
            }
        }
    }, [value])


    const optionItems = optionTypes[filterType] ?? []

    const handleSelect = (value) => {
        onChange?.(value)
        setSelectedValue(value)
    }

    const { dropdownClasses, iconClasses, selectRef, toggleList } = useToggleSelect()

    return (
        <div className="select" onClick={toggleList} ref={selectRef}>
            <div className="select__wrapper">
                <div
                    className="select__button"
                    role='combobox'
                    aria-expanded='false'
                    aria-haspopup='listbox'
                    aria-controls={filterType}
                >{selectedValue}</div>
                <div className={iconClasses}>
                    <Icon name="Chevron" />
                </div>
            </div>

            <div 
                className={dropdownClasses}
                role='listbox'
                id={filterType}
            >
                {optionItems.map((item, index) => (
                    <div 
                        className={clsx('select__option', {
                            active: selectedValue === item
                        })}
                        role='option'
                        aria-selected={selectedValue === item}
                        id={`option-${index}`}
                        key={index}
                        onClick={() => {handleSelect(item)}}
                    >{item}</div>
                ))}
            </div>
        </div>
    )
}