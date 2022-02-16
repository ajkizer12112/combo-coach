import React, { useContext } from 'react'
import CardWrapper from '../cards/CardWrapper'
import { ModalContext } from '../../context/ModalContext'

const ModalWrapper = ({ children, modalName }) => {
    const { modals, modalActions } = useContext(ModalContext)
    const closeModal = () => modalActions.closeModal(modalName)

    return (
        <div className={`modal${!modals[modalName] ? "" : " is-active"}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <CardWrapper>
                    {children}
                </CardWrapper>
            </div>
            <button onClick={closeModal} className="modal-close is-large" aria-label="close" ></button>

        </div>
    )
}

export default ModalWrapper