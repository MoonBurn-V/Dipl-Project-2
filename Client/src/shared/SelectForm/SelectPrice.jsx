import { useState, useEffect } from 'react'
import '../Select/Select.scss'
import clsx from 'clsx'
import Icon from '../Icon/Icon'
import { useToggleSelect } from '../lib/hooks/useToggleSelect'

export const SelectPrice = ({ onChange, price }) => {
  const [selectText, setSelectText] = useState('Цена')
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isError, setIsError] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [freeOnly, setFreeOnly] = useState(false)

  const optionText = 'Только бесплатные'

  const { dropdownClasses, iconClasses, selectRef, toggleList, isOpen } = useToggleSelect()

  const applyRange = () => {
    onChange?.({
      min: from ? Number(from) : null,
      max: to ? Number(to) : null,
      freeOnly: false,
    })
  }

  const applyFreeOnly = () => {
    setFreeOnly(true)

    onChange?.({
      min: null,
      max: null,
      freeOnly: true,
    })
  }


  useEffect(() => {
    if (!price.min && !price.max && !price.freeOnly) {
      setSelectText('Цена')
      setFrom('')
      setTo('')
      setFreeOnly(false)
    }
  }, [price])


  useEffect(() => {
    if (isError) return

    const parseFrom = parseInt(from)
    const parseTo = parseInt(to)

    if (!isOpen && !isOptionSelected) {
      if (from.trim() || to.trim()) {
        if (parseFrom > parseTo) {
          setSelectText('Не верная фильтрация')
        } else {
          setSelectText('Фильтр по цене')
          applyRange()
        }
      } else {
        setSelectText('Цена')
      }
    }
  }, [isOpen, from, to, isOptionSelected, isError])

  const handelOptionClick = () => {
    setIsOptionSelected(true)
    setSelectText(optionText)
    applyFreeOnly()
    toggleList()
  }

  const isOnlyNumbers = (value) => /^\d*$/.test(value)

  return (
    <div className="select" ref={selectRef} onClick={toggleList}>
      <div className="select__wrapper">
        <div className="select__button">
          {selectText}
        </div>
        <div className={iconClasses}>
          <Icon name="Chevron" />
        </div>
      </div>

      <div className={dropdownClasses}>
        <div
          className="select__dropdown-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="select__input-wrapper">
            <label htmlFor="from">от:</label>
            <input
              type="text"
              className={clsx('select__input', {error: isError})}
              placeholder="0p"
              id="from"
              value={from}
              onChange={
                (e) => {
                const value = e.target.value
                setFrom(value)

                if(isOnlyNumbers(value)) {
                  setIsOptionSelected(false)
                  setIsError(false)
                } else {
                  setIsError(true)
                }
              }}
            />
          </div>

          <div className="select__input-wrapper">
            <label htmlFor="to">до:</label>
            <input
              type="text"
              className={clsx('select__input', {error: isError})}
              placeholder="0p"
              id="to"
              value={to}
              onChange={(e) => {
                const value = e.target.value
                setTo(value)

                if (isOnlyNumbers(value)) {
                  setIsOptionSelected(false)
                  setIsError(false)
                } else {
                  setIsError(true)
                }
              }}
            />
          </div>
        </div>

        <div
          className="select__option"
          onClick={handelOptionClick}
        >
          {optionText}
        </div>
      </div>
    </div>
  )
}