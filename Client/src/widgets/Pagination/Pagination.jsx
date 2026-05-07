import './Pagination.scss'
import clsx from 'clsx'
import Button from '@/shared/Button/Button'
import Icon from '@/shared/Icon/Icon'

export const Pagination = ({ coursesData, page, setPage, loading }) => {

    const totalCards = coursesData?.count || 0
    const numbPages = Math.ceil(totalCards / 9)

    if (numbPages == 1) return
    if (loading) return

    return (
        <div className="pagination">
            <Button
                className="menu-button blue" 
                aria-label="Предыдущая страница" 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
            >
                <Icon name="arrow-left" />
            </Button>
            <ul className="pagination__pages">
                {Array.from({ length: numbPages }, (_, index) => (
                    <li 
                        key={index}
                        className={clsx("pagination__page", { active: page === index + 1 })}
                        aria-label={`Переход на страничку ${index + 1}`}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </li>
                ))}
            </ul>
            <Button
                className="menu-button blue" 
                aria-label="Следующая страница" 
                disabled={page == numbPages} 
                onClick={() => setPage(p => p + 1)}
            >
                <Icon name="arrow-right" />
            </Button>
        </div>
    )
}