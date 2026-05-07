import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export const useAudienceAnimation = () => {
  const blocL = useRef()
  const blocR = useRef()
  const ellipseGroup = useRef()


  useGSAP(() => {

    const initialAnimations = () => {

      let mm = gsap.matchMedia()
      let itemsL = gsap.utils.toArray(blocL.current.children)
      let itemsR = gsap.utils.toArray(blocR.current.children)

      const blueEllipse = ellipseGroup.current.querySelector('.audience__blue')
      const greenEllipse = ellipseGroup.current.querySelector('.audience__green')
      const voidEllipse = ellipseGroup.current.querySelector('.audience__void')

      const orderedEllipses = []
      if (blueEllipse) orderedEllipses.push(blueEllipse)
      if (greenEllipse) orderedEllipses.push(greenEllipse)
      if (voidEllipse) orderedEllipses.push(voidEllipse)

      mm.add("(min-width: 481px)", () => {

        const tl = gsap.timeline({
          defaults: {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          scrollTrigger: {
            trigger: ".audience__title",
            start: 'top bottom',
            end: 'top 10%',
            toggleActions: 'play none none reverse',
            scrub: true,
            invalidateOnRefresh: true,
          }
        })

        tl.from(".audience__title", { x: 100, }, 0)
        tl.from(".audience__blue-stars", { y: -50, }, "<0.5")

      })

      mm.add("(max-width: 480px)", () => {

        gsap.from(".audience__title", {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: ".audience__title",
            start: 'top 110%',
            end: 'top 10%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          }
        })
        
      })

      itemsL.forEach(item => {
        gsap.fromTo(item, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
      })

      itemsR.forEach(item => {
        gsap.fromTo(item, { opacity: 0, x: 50 }, {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        })
      })

    if (orderedEllipses.length > 0) {
      const ellipseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ellipseGroup.current,
          start: 'top 80%',
          end: 'bottom 38%',
          toggleActions: 'play none none reverse',
          scrub: true,
          invalidateOnRefresh: true,
        }
      })

        orderedEllipses.forEach((ellipse, index) => {
          ellipseTimeline.fromTo(ellipse, {
            x: -200,
            rotation: -360,
            opacity: 0,
          }, {
            x: 0,
            rotation: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 2,
          }, index * 0.5)
        })
      }

      const startValue = window.innerWidth <= 830 ? 'top 110%' : 'top bottom'

      gsap.from(".audience__button-container", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".audience__button-container",
          start: startValue,
          end: 'top 10%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        }
      })

    }

    initialAnimations()
    
    const handlerOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100);
    }

    window.addEventListener('orientationchange', handlerOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handlerOrientationChange)
    }

  }, [])

  return { blocL, blocR, ellipseGroup }
}