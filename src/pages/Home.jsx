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
import UserInfo from '../components/sections/UserInfo'
import Navbar from '../components/navigation/Navbar'
import { ModalContext } from '../context/ModalContext'


const Home = () => {
    const { dropdownActions } = useContext(DropdownContext);
    const { account, profileFns } = useContext(AccountContext);
    const { modalActions } = useContext(ModalContext)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        profileFns.authenticateUser();
        setLoading(false);
    }, []);

    return (
        <main className="has-background-dark">
            <Navbar />
            {!loading ?
                <section className="mx-auto columns section is-centered is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
                    <Lights />
                    <div className="column p-6 is-rounded has-background-grey-dark is-centered has-text-centered has-text-light columns is-multiline is-mobile is-10 mx-auto">
                        <TimerDisplay />
                        <TimerControls />
                    </div>

                    <div className="column is-12 has-text-white has-text-centered">
                        <WorkoutDisplay />
                    </div>

                    <ModalWrapper modalName="options">
                        <Options />
                        <div className="has-text-centered">
                            <button className="button my-6 mx-auto has-font-8bit" onClick={() => modalActions.closeModal("options")}>Save</button>
                        </div>
                    </ModalWrapper>
                    <ModalWrapper modalName="account">
                        {account.isAuthenticated ? <UserInfo /> : <Auth />}
                    </ModalWrapper>

                </section  > : "loading"
            }
        </main >
    )
}

export default Home
