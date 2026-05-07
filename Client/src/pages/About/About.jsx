import { useTitle } from '../../providers/TitleContext'
import './About.scss'

const About = () => {

  useTitle("MegaSkills | О нас")

  return (
    <>
      <section className="tests0">
        <h1>This About</h1>
        <p>Начните обучение сегодня</p>
      </section>
      <section className="test2"></section>
      <section className="test3"></section>
      <section className="test4"></section>
    </>
  )
}

export default About