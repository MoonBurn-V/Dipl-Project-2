import './CertificateModal.scss'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseModal } from '@/shared/Modal/BaseModal'
import { CertificateContext } from '@/providers/CertificateProvider'
import Button from '@/shared/Button/Button'
import Field from '@/shared/Field/Field'

export const CertificateModal = () => {
    const { isOpen, closeModal, courseId } = useContext(CertificateContext)
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')

    const handleNameChange = (e) => {
        setFullName(e.target.value)
        setError('')
    }

    const handleGetCertificate = () => {
        // Проверка, что ФИО не пусто
        if (!fullName.trim()) {
            setError('Пожалуйста, введите ФИО')
            return
        }

        // Проверка, что введены минимум два слова (имя и фамилия)
        const nameParts = fullName.trim().split(/\s+/)
        if (nameParts.length < 2) {
            setError('Пожалуйста, введите полное ФИО (минимум имя и фамилию)')
            return
        }

        // Здесь можно добавить логику сохранения ФИО в базу данных
        // и генерирования сертификата

        // Переходим на страницу с сертификатом
        closeModal()
        navigate(`/completed/${courseId}`, { state: { fullName } })
        setFullName('')
    }

    const titleText = "Получить сертификат"

    return (
        <BaseModal isOpen={isOpen} onClose={closeModal} title={titleText}>
            <div className='certificate-modal'>
                <p className='certificate-modal__text'>
                    Введите своё настоящее ФИО чтобы получить сертификат
                </p>

                <Field
                    fieldClass={"field-dark"}
                    type="text"
                    placeholder="Фамилия Имя Отчество"
                    value={fullName}
                    onChange={handleNameChange}
                    labelText="ФИО"
                />

                {error && (
                    <div className='certificate-modal__error'>
                        {error}
                    </div>
                )}

                <div className='certificate-modal__buttons'>
                    <Button 
                        className="certificate-modal__button menu-button blue"
                        onClick={handleGetCertificate}
                    >
                        Получить сертификат
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}
