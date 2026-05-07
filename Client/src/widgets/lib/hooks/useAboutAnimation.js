import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)


export const useAboutAnimation = (ready, variant) => {
  const headerRef = useRef()
  const argumentsRef = useRef()
  const elementsRef = useRef()
  let mm = gsap.matchMedia()

  useGSAP (()=> {

    if (!ready) return

    if (headerRef.current) {

      mm.add("(min-width: 831px)", () => {
        gsap.from(headerRef.current, { 
          y: 40,
          opacity: 0,
          duration: 2,
          ease: 'power2.out',

          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top bottom',
            end: 'top 10%',
            toggleActions: 'play none none none',
          }
        })
      })
    }

    if (argumentsRef.current) {

      mm.add("(min-width: 831px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: argumentsRef.current,
            start: 'top bottom',
            end: 'top 10%',
            toggleActions: 'play none none none',
          },
        })

        tl.fromTo(argumentsRef.current,
          {
            maxHeight: 50,
          },
          {
            maxHeight: 9999,
            duration: 4,
            ease: 'power2.inOut',
          },
          0
        )

        let listItems

        variant === "list" 
          ? listItems = gsap.utils.toArray(argumentsRef.current.querySelectorAll('.info__item')) 
          : listItems = gsap.utils.toArray(argumentsRef.current.children) 

        tl.from(listItems, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
          },
          0.8 
        )
      })
    }

    if (elementsRef.current) {
      const elementsToAnimate = gsap.utils.toArray(elementsRef.current.children)

      elementsToAnimate.forEach((element) => {
        let translateYValue
        let rotationValueStart
        let rotationValue

        if (element.classList.contains('about__image')) {
          rotationValueStart = 3
          translateYValue = 100
          rotationValue = 3
        } else {
          rotationValueStart = 0
          translateYValue = -100
          rotationValue = 43
        }

        gsap.fromTo(element,
          {
            y: 0,
            rotation: rotationValueStart,
          },
          {            
            y: translateYValue,
            rotation: rotationValue,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'top 10%',
              scrub: true,
            },
            ease: 'power1.inOut',
          }
        )
      })
    }

  }, [ready])

  return { headerRef, argumentsRef, elementsRef }
}