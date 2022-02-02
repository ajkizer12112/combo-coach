import React, { useContext, useState, useEffect } from 'react'
import { DropdownContext } from '../context/DropdownContext'
import Options from '../components/sections/Options'

import ModalWrapper from '../components/modals/ModalWrapper'
import TimerControls from '../components/sections/TimerControls'
import TimerDisplay from '../components/sections/TimerDisplay'
import WorkoutDisplay from '../components/sections/WorkoutDisplay'
import Lights from '../components/sections/Lights'
import Auth from '../components/forms/containers/Auth'
import { AccountContext } from '../context/AccountContext'


const Home = () => {
    const { dropdownActions } = useContext(DropdownContext);
    const { account, authenticationFns, userStats, profileFns } = useContext(AccountContext);
    const [loading, setLoading] = useState(true);

    const [showLogin, toggleLoginModal] = useState(false);
    const [showOptionsModal, toggleOptionsModal] = useState(false);
    const closeOptionsModal = () => toggleOptionsModal(false);
    const openOptionsModal = () => toggleOptionsModal(true);
    const closeLoginModal = () => toggleLoginModal(false);

    useEffect(() => {
        authenticationFns.authenticateUser();
        setLoading(false);
    }, []);

    console.log({ userStats })
    return (
        <main className="has-background-dark">
            {!loading ?
                <section className=" mx-auto columns section is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
                    <div className="column has-background-grey-dark  is-centered has-text-centered has-text-light columns is-multiline is-mobile is-10 mx-auto">
                        <Lights />
                        <WorkoutDisplay />
                        <TimerDisplay />
                        <TimerControls openModal={openOptionsModal} />
                    </div>
                    <button className="button" onClick={() => toggleLoginModal(true)}>My Account</button>
                    <ModalWrapper closeModal={closeOptionsModal} showModal={showOptionsModal}>
                        <Options />
                        <div className="has-text-centered">
                            <button className="button my-6 mx-auto has-font-8bit" onClick={closeOptionsModal}>Save</button>
                        </div>
                    </ModalWrapper>
                    <ModalWrapper closeModal={closeLoginModal} showModal={showLogin}>
                        {account.isAuthenticated ? <>{account.currentUser.username}</> : <Auth />}
                    </ModalWrapper>

                </section  > : "loading"
            }
        </main >
    )
}

export default Home
