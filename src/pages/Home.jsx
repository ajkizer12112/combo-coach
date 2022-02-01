import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'
import { combos } from '../combinations/fundamentals'
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

    // useEffect(() => {
    //     let timerId;
    //     timer.runWarningChecks();
    //     if (workout.timerActive) {
    //         if (workout.currentTime === 0) {
    //             timer.runZero();
    //         }

    //         const timeout = () => setTimeout(() => timer.decrementTimer(), 1000);
    //         timerId = timeout();
    //     }

    //     return () => {
    //         clearTimeout(timerId)
    //     }
    // }, [workout])

    const rounds = [3, 4, 6, 8, 10, 12, 24, Infinity];
    const restTimes = [30, 45, 60];
    const roundTimes = [120, 180, 300];
    const workoutRates = [5, 4, 3, 2];

    const dropdowns = [
        {
            title: "Number of Rounds",
            items: rounds,
            dropdownOption: "totalRounds"
        },
        {
            title: "Rest",
            items: restTimes,
            dropdownOption: "restTime"
        },
        {
            title: "Combo Rate",
            items: workoutRates,
            dropdownOption: "rate"
        },
        {
            title: "Round Time",
            items: roundTimes,
            dropdownOption: "roundTime"
        },
        {
            title: "Combos",
            items: combos,
            dropdownOption: "combos"
        }
    ]

    return (
        <main className="has-background-dark">
            <section className="timer-container mx-auto section columns is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
                <div className="column has-background-grey-dark is-align-items-center is-centered has-text-centered has-text-light columns is-multiline is-mobile is-10 mx-auto p-6">
                    <Lights />
                    <WorkoutDisplay />
                    <TimerDisplay />
                    <TimerControls openModal={openModal} />
                </div>
                <ModalWrapper closeModal={closeModal} showModal={showModal}>
                    <Options dropdowns={dropdowns} />
                    <div className="has-text-centered">
                        <button className="button my-6 mx-auto has-font-8bit" onClick={closeModal}>Save</button>
                    </div>
                </ModalWrapper>

            </section  >
        </main>
    )
}

export default Home
