import './UserHabSkeleton.scss'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

export const UserHabSkeleton = () => {
    return (
        <section className="hab-skeleton">
            <div className="hab-skeleton__inner container">

                <div className="hab-skeleton__info">

                    <div className="hab-skeleton__user">
                        <div className="hab-skeleton__avatar">
                            <Skeleton circle />
                        </div>

                        <div className="hab-skeleton__name">
                            <Skeleton />
                        </div>
                    </div>

                    <div className="hab__achievements">
                        <h2 className="hab__achievements-title">
                            Достижения
                        </h2>

                        <div className="hab-skeleton__achievements">

                            <div className="hab-skeleton__achievement">
                                <Skeleton circle />
                            </div>

                            <div className="hab-skeleton__achievement">
                                <Skeleton circle />
                            </div>

                            <div className="hab-skeleton__achievement">
                                <Skeleton circle />
                            </div>

                        </div>
                    </div>

                </div>

                <div className="hab__courses">
                    <h2 className="hab__courses-title">
                        Ваши курсы
                    </h2>

                    <div className="hab__courses-wrapper">

                        <div className="hab-skeleton__course">
                            <Skeleton />
                        </div>

                        <div className="hab-skeleton__course">
                            <Skeleton />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}