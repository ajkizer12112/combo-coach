import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

const Navbar = ({ toggleLoginModal }) => {
    const { account, authenticationFns } = useContext(AccountContext);

    return (
        <nav className="navbar has-shadow p-3">
            <div className="navbar-start"></div>
            <div className="navbar-end">
                <span onClick={() => toggleLoginModal(true)}>{account.isAuthenticated ? "My Account" : "Sign In"}</span>
                {account.isAuthenticated && <span onClick={() => authenticationFns.logout()}>Logout</span>}
            </div>
        </nav>
    )
};

export default Navbar;
