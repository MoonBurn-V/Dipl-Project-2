import './HeroSecondary.scss'

export const HeroSecondary = ({title, type, subtitle}) => {
    return (
        <section className="hero-secondary">
            {type === "coursesTitle" && (
                <h1 className="hero-secondary__title">
                    Начни свой путь в профессии<br />с <span className="hero__title-word secondary">нашими</span> курсами
                </h1>
            )}
            {type === "courseTitle" && (
                <>
                    <div className="hero-secondary__subtitle h3">
                        {subtitle}
                    </div>
                    <h1 className="hero-secondary__title">
                        {title}
                    </h1>
                </>
            )}
        </section>
    )
}