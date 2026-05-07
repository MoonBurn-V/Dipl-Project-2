import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin( ScrollSmoother)

export const SmoothScrollWrapper = ({ children }) => {

    useGSAP(() => {
        let smoother = ScrollSmoother.create({
            content: "#smooth-content",
            wrapper: "#smooth-wrapper",
            smooth: 1.5,
            effects:false
        })

        return () => {
            if (smoother) {
                smoother.kill()
            }
        }
    }, [])

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}