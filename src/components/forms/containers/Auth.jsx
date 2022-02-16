import React, { useContext, useState } from 'react';
import Login from '../formTypes/Login';
import Register from '../formTypes/Register';
import { ModalContext } from '../../../context/ModalContext';

const Auth = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const { modalActions } = useContext(ModalContext)
    const closeModal = () => modalActions.closeModal("account")
    return (
        <>
            {hasAccount ? <Login closeModal={closeModal} /> : <Register closeModal={closeModal} />}
            <small onClick={() => setHasAccount(!hasAccount)}>{hasAccount ? "I don't have an account" : "I have an account"}</small>
        </>
    )
};

export default Auth;
