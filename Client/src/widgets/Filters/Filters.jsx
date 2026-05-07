import './Filters.scss'
import { useState, useEffect } from 'react'
import { Select } from '@/shared/Select/Select'
import { SelectPrice } from '@/shared/SelectForm/SelectPrice'
import { SearchInput } from '@/shared/SearchInput/SearchInput'
import Button from '@/shared/Button/Button'

export const Filters = ({ 
    type,
    difficulty,
    order,
    price,
    setType, 
    setDifficulty, 
    setOrder, 
    setPage,
    setPrice,
    inputSearch = '',
    setInputSearch,
    clearFilters,
}) => {

    const [localSearch, setLocalSearch] = useState(inputSearch || '')
    const isAnyFiltersActive = 
        type ||
        difficulty ||
        order !== 'date' ||
        price.min !== null ||
        price.max !== null ||
        price.freeOnly ||
        inputSearch.length > 0


    useEffect(() => {
        const timer = setTimeout(() => {
            setInputSearch(localSearch)
            setPage(1)
        }, 300)

        return () => clearTimeout(timer)
    }, [localSearch])

    const handelClear = () => {
        setLocalSearch('')
        clearFilters()
    }

    return (
        <div className="filters">

            <Select 
                filterText="Для кого" 
                filterType="audience"
                value={type}
                onChange={(value) => {
                    setType(value)
                    setPage(1)
                }}
            />
            <Select 
                filterText="Самые новые" 
                filterType="order"
                value={order}
                onChange={(value) => {
                    if (value === 'Самые новые') setOrder('date')
                    else if (value === 'Рейтинг') setOrder('rating')

                    setPage(1)
                }} 
            />
            <Select 
                filterText="Сложность" 
                filterType="complexity"
                value={difficulty}
                onChange={(value) => {
                    setDifficulty(value)
                    setPage(1)
                }}
            />
            <SelectPrice 
                onChange={(value) => {
                    setPrice(value)
                    setPage(1)
                }}
                price={price}
            />

            <SearchInput
                placeholder="Поиск по карточкам"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
            />
            {isAnyFiltersActive && (
                <Button className="clear" onClick={handelClear}>
                    Сброс
                </Button>
            )}
        </div>
    )
}