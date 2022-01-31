import React from 'react'
import CardWrapper from '../cards/CardWrapper'

const ModalWrapper = ({ children, closeModal, showModal }) => {
    return (
        <div className={`modal${!showModal ? "" : " is-active"}`}>
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