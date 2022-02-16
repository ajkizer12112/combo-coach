import React, { useContext } from 'react'
import ModalWrapper from './ModalWrapper'
import Options from '../sections/Options'
import { ModalContext } from '../../context/ModalContext'

const OptionsModal = () => {
    const { modals, modalActions } = useContext(ModalContext)
    const closeModal = () => modalActions.closeModal("options")
    return (
        <ModalWrapper closeModal={closeModal} showModal={modals.options}>
            <Options />
            <div className="has-text-centered">
                <button className="button my-6 mx-auto has-font-8bit" onClick={closeModal}>Save</button>
            </div>
        </ModalWrapper>
    )
}

export default OptionsModal