import { Outlet, useLocation } from 'react-router-dom'
import { SmoothScrollWrapper } from '../SmoothScrollWrapper/SmoothScrollWrapper'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Layout = () => {
  const location = useLocation()

  useGSAP(() => {
    window.scrollTo(0, 0)
    
    gsap.context(() => {
      if (gsap.context().scrollTrigger) {
        gsap.context().scrollTrigger.refresh()
      }
    })
  }, [location.pathname])

  return (
    <>
      <Header />
      <SmoothScrollWrapper>
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </SmoothScrollWrapper>

      {/* <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer /> */}
    </>
  )
}

export default Layout