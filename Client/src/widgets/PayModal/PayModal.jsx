import './PayModal.scss'
import Button from '@/shared/Button/Button'
import { UserCoursesContext } from '@/providers/UserCoursesProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchUserCourse } from '@/entities/userCourse/model/useFetchUserCourse'
import { BaseModal } from '@/shared/Modal/BaseModal'
import QR from '../../../assets/images/QR-kod.png'

export const PayModal = () => {
    const { payOpen, setPayOpen, getData, currentCourseId } = useContext(UserCoursesContext)
    const { fetchUserCourse } = useFetchUserCourse()
    const navigate = useNavigate()

    const titleText = "Оплата курса"

    const closeModal = () => {
        setPayOpen(false)
    }

    const userCourseConnect = () => {
        const data = getData(currentCourseId)
        fetchUserCourse(data)

        setPayOpen(false)
        navigate(`/courses/${currentCourseId}/lesson/1`)
    }

    if (!payOpen) return

    return (
        <BaseModal isOpen={payOpen} onClose={closeModal} title={titleText}>
            <img src={QR} alt="QR-kod для оплаты" className='pay__QR-kod'/>
            <Button className="menu-button blue" onClick={userCourseConnect}>Оплатить</Button>
        </BaseModal>
    )
}