import React from 'react'
import ModalWrapper from './ModalWrapper'

const AccountModal = () => {
    return (
        <ModalWrapper closeModal={closeLoginModal} showModal={showLogin}>
            {account.isAuthenticated ? <UserInfo /> : <Auth closeModal={closeLoginModal} />}
        </ModalWrapper>
    )
}

export default AccountModal