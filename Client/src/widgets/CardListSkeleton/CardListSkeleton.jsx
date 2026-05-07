import "./CardListSkeleton.scss"
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

export const CardListSkeleton = () => {
    return (
        <div className="card-list">
            {Array.from({ length: 6 }).map((_, index) => (
                <div className="skeleton-card" key={index}>
                    <Skeleton className="skeleton-card__image" borderRadius="var(--border-radius-s)"/>
                    <Skeleton height="50px" width="90%"/>
                    <Skeleton height="30px" width="60%"/>
                    <Skeleton />
                    <Skeleton height="60px" width="40%" borderRadius="var(--border-radius)"/>
                </div>
            ))}
        </div>
    )
}