import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export const useHeaderAnimation = () => {
  const mm = useRef(gsap.matchMedia())

  useGSAP(() => {
    
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power1.out",
        opacity: 0,
      }
    })

    mm.current.add("(min-width: 1025px)", () => {
      tl.from(".logo-container", { y: -200, }, 0)
        .from(".header__menu", { y:-200 }, "<0.5")
        .from(".button-container", { y:-200, stagger: 0.2 }, "<0.5")
    })

    mm.current.add("(max-width: 1024px)", () => {
      tl.from(".logo-container", { x: -200, duration: 0.5, }, 0)
        .from(".BurgerButton-container", { x: 50, duration: 0.5, }, 0)
    })

    return () => mm.current.revert()

  }, [])
}