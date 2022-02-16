import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { ModalContext } from '../../context/ModalContext';

const Navbar = () => {
    const { account, authenticationFns } = useContext(AccountContext);
    const { modals, modalActions } = useContext(ModalContext)

    return (
        <nav className="navbar has-shadow p-3">
            <div className="navbar-start"></div>
            <div className="navbar-end">
                <span className="mr-2" onClick={() => modalActions.showModal("account")}>{account.isAuthenticated ? "My Account" : "Sign In"}</span>
                {account.isAuthenticated && <span onClick={() => authenticationFns.logout()}>Logout</span>}
            </div>
        </nav>
    )
};

export default Navbar;
