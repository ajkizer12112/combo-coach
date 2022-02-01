import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'

import ModalWrapper from '../components/modals/ModalWrapper'
import TimerControls from '../components/sections/TimerControls'
import TimerDisplay from '../components/sections/TimerDisplay'
import WorkoutDisplay from '../components/sections/WorkoutDisplay'
import Lights from '../components/sections/Lights'


const Home = () => {
    const { workout, workoutActions: { timer, workoutFns, sounds } } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    const [showModal, toggleModal] = useState(false);

    const closeModal = () => toggleModal(false);
    const openModal = () => toggleModal(true);


    return (
        <main className="has-background-dark">
            <section className=" mx-auto columns section is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
                <div className="column has-background-grey-dark  is-centered has-text-centered has-text-light columns is-multiline is-mobile is-10 mx-auto">
                    <Lights />
                    <WorkoutDisplay />
                    <TimerDisplay />
                    <TimerControls openModal={openModal} />
                </div>
                <ModalWrapper closeModal={closeModal} showModal={showModal}>
                    <Options />
                    <div className="has-text-centered">
                        <button className="button my-6 mx-auto has-font-8bit" onClick={closeModal}>Save</button>
                    </div>
                </ModalWrapper>

            </section  >
        </main>
    )
}

export default Home
