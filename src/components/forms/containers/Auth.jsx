import React, { useState } from 'react';
import CardWrapper from '../../cards/CardWrapper';
import Login from '../formTypes/Login';
import Register from '../formTypes/Register';

const Auth = () => {
    const [hasAccount, setHasAccount] = useState(false);
    return (
        <CardWrapper>
            {hasAccount ? <Login /> : <Register />}
            <small onClick={() => setHasAccount(!hasAccount)}>{hasAccount ? "I don't have an account" : "I have an account"}</small>
        </CardWrapper>
    )
};

export default Auth;
