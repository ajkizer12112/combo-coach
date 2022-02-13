import React, { useState } from 'react';
import CardWrapper from '../../cards/CardWrapper';
import Login from '../formTypes/Login';
import Register from '../formTypes/Register';

const Auth = ({ closeModal }) => {
    const [hasAccount, setHasAccount] = useState(true);
    return (
        <>
            {hasAccount ? <Login closeModal={closeModal} /> : <Register closeModal={closeModal} />}
            <small onClick={() => setHasAccount(!hasAccount)}>{hasAccount ? "I don't have an account" : "I have an account"}</small>
        </>
    )
};

export default Auth;
