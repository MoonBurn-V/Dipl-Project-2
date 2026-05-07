import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const useHeroAnimation = () => {
    const [screenType, setScreenType] = useState('desktop')

    const initialScreenTypeRef = useRef(null)

    const desktopMedia = window.matchMedia('(min-width: 1025px)');
    const tabletMedia = window.matchMedia('(min-width: 481px) and (max-width: 1024px)');
    const mobileMedia = window.matchMedia('(max-width: 480px)');

    const getScreenType = () => {
        if (desktopMedia.matches) return 'desktop'
        if (tabletMedia.matches) return 'tablet'
        if (mobileMedia.matches) return 'mobile'
        return 'desktop'
    }

    useEffect(() => {

        if (initialScreenTypeRef.current === null) {
            initialScreenTypeRef.current = getScreenType()
        }
        
    }, [])

    useGSAP(() => {
        const typeForAnimation = initialScreenTypeRef.current || getScreenType()

        const tl = gsap.timeline({
                defaults: {
                duration: 1,
                ease: "power1.out",
                opacity: 0,
            }
        });

        const animationsConfig = {
            desktop: [
                { selector: ".hero__subtitle", props: { x: -900, duration: 1.5 }, position: 0 },
                { selector: ".hero__title", props: { x: -900 }, position: "<0.2" },
                { selector: ".button-animation", props: { x: -900 }, position: "<0.2" },
                { selector: ".hero__bottom", props: { y: 200 }, position: "<0.3" },

                { selector: ".hero__image1", props: { x: 900 }, position: 1.2 },
                { selector: ".hero__image2", props: { x: 900 }, position: "<0.2" },
                { selector: ".hero__image3", props: { x: 1100 }, position: "<0.3" },

                { selector: ".hero__image-panel1", props: { x: 50, rotate: 0 }, position: ">-0.4" },
                { selector: ".hero__image-panel2", props: { x: -90, rotate: 0 }, position: "<0.2" },
                { selector: ".hero__image-panel3", props: { x: 0, rotate: 0 }, position: "<0.2" },

                { selector: ".hero__header-stars", props: { y: -50 }, position: ">-0.4" },
                { selector: ".hero__header-arrow", props: { y: -40 }, position: "<0.3" },
                { selector: ".hero__button-icon", props: { scale: 0, duration: 0.4 }, position: "<0.7" },
            ],

            tablet: [
                { selector: ".hero__mobile-students", props: { x: 200 }, position: 0 },
                { selector: ".hero__mobile-help", props: { x: -200 }, position: 0 },

                { selector: ".hero__subtitle", props: { y: 20, duration: 1.5 }, position: 0.8 },
                { selector: ".hero__title", props: { y: 20, duration: 1.5 }, position: "<0.2" },
                { selector: ".button-animation", props: { y: 20, duration: 1.5 }, position: "<0.3" },

                { selector: ".hero__image1", props: { x: -200 }, position: 1.2 },
                { selector: ".hero__image2", props: { x: 200 }, position: "<0.2" },
                { selector: ".hero__image3", props: { x: -200 }, position: "<0.3" },

                { selector: ".hero__image-panel1", props: { x: -50, rotate: 0 }, position: ">-0.4" },
                { selector: ".hero__image-panel2", props: { x: 90, rotate: 0 }, position: "<0.2" },
                { selector: ".hero__image-panel3", props: { x: 0, rotate: 0 }, position: "<0.2" },

                { selector: ".hero__header-arrow", props: { y: -40, duration: 0.5 }, position: "<0.3" },
                { selector: ".hero__button-icon", props: { scale: 0, duration: 0.4 }, position: "<0.1" },
            ],

            mobile: [
                { selector: ".hero__subtitle", props: { y: 20, duration: 1.5 }, position: 0.8 },
                { selector: ".hero__title", props: { y: 20, duration: 1.5 }, position: "<0.2" },
                { selector: ".button-animation", props: { y: 20, duration: 1.5 }, position: "<0.3" },
                { selector: ".hero__button-icon", props: { scale: 0, duration: 0.4 }, position: "<0.1" },

                { selector: ".hero__image1", props: { x: -200 }, position: 1.5 },
                { selector: ".hero__mobile-students", props: { x: 200 }, position: "<" },
                { selector: ".hero__image2", props: { x: 200 }, position: "<0.5" },
                { selector: ".hero__mobile-help", props: { x: -200 }, position: "<" },
            ],
        };

        const currentConfig = animationsConfig[typeForAnimation]

        if (currentConfig) {
            currentConfig.forEach(({ selector, props, position }) => {
            tl.from(selector, { ...props, opacity: 0 }, position)
            })
        }

        return () => {  }
    }, [])
}