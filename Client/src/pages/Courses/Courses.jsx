import './Courses.scss'
import { useTitle } from '@/providers/TitleContext'
import { useCourses } from '@/features/CourseCatalog/model/useCourses'
import { HeroSecondary } from '@/widgets/HeroSecondary/HeroSecondary'
import { Filters } from '@/widgets/Filters/Filters'
import { CardList } from '@/widgets/CardList/CardList'
import { Pagination } from '@/widgets/Pagination/Pagination'

const Courses = () => {

  useTitle("MegaSkills | Курсы")

  const courses = useCourses()

  return (
    <>
      <HeroSecondary type="coursesTitle" />

      <section className="courses">
        <div className="courses__container container">
          <Filters {...courses} />
          <CardList {...courses} />
          <Pagination {...courses} />
        </div>
      </section>
    </>
  )
}

export default Courses