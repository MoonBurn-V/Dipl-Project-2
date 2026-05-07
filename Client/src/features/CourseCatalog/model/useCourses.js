import { useEffect, useState } from 'react'
import { getCourses } from '@/entities/courses/api/getCourses'

export const useCourses = () => {

    const [coursesData, setCoursesData] = useState({})
    const [page, setPage] = useState(1)
    const [inputSearch, setInputSearch] = useState('')
    const [order, setOrder] = useState('date')
    const [type, setType] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [price, setPrice] = useState({
        min: null,
        max: null,
        freeOnly: false,
    })

    const clearFilters = () => {
        setType('')
        setDifficulty('')
        setOrder('date')
        setPrice({
            min: null,
            max: null,
            freeOnly: false,           
        })
        setInputSearch('')
        setPage(1)
    }

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                params.append("page", page)
                
                if (price.freeOnly) {
                    params.append("priceIsNull", "true")
                } else {
                    if (price.min !== null) params.append("minPrice", price.min)
                    if (price.max !== null) params.append("maxPrice", price.max)
                }
                if (type) params.append("type", type)
                if (difficulty)  params.append("difficulty", difficulty)
                if (order === 'date') {
                    params.append("sort", "created_date")
                    params.append("order", "ASC")
                }
                if (order === 'rating') {
                    params.append("sort", "rating")
                    params.append("order", "DESC")
                }
                
                if (inputSearch) params.append("search", inputSearch)
                
                const url = `/api/course?${params.toString()}`
                const data = await getCourses(url)
                setCoursesData(data)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page, type, difficulty, order, price, inputSearch])

    return { 
        coursesData, 
        loading, 
        error, 
        page, 
        inputSearch,
        type,
        difficulty,
        order,
        price,
        setPage, 
        setType, 
        setDifficulty, 
        setOrder,
        setPrice,
        setInputSearch,
        clearFilters,
    }
}