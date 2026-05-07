import "./ContentSkeleton.scss"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export const ContentSkeleton = () => {
    return (
        <>
            <section className="hero-secondary">
                <div className="skeleton-hero">
                    <Skeleton width="100px" height="30px"/>
                    <Skeleton width="500px" height="50px"/>
                </div>
            </section>

            <section className="content skeleton">
                <div className="content__container container">
                    <div className="content__lecture">
                        {Array.from({ length: 6 }).map((_, index) => (
                        <div className="skeleton-groupe" key={index}>
                            <Skeleton height="50px" width="60%"/>
                            <Skeleton height="30px" width="50%"/>
                            <Skeleton height="30px" width="70%"/>
                            <Skeleton height="30px" width="40%"/>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}