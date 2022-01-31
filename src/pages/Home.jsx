import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'
import { combos } from '../combinations/fundamentals'
import ModalWrapper from '../components/modals/ModalWrapper'


const Home = () => {
    const { workout, workoutActions: { timer, workoutFns, sounds } } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    const [showModal, toggleModal] = useState(false);

    const closeModal = () => toggleModal(false);
    const openModal = () => toggleModal(true);

    useEffect(() => {
        let timerId;
        timer.runWarningChecks();
        if (workout.timerActive) {
            if (workout.currentTime === 0) {
                timer.runZero();
            }

            const timeout = () => setTimeout(() => timer.decrementTimer(), 1000);
            timerId = timeout();
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [workout])

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
                    <div className={`has-background-danger light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
                    <div className={`has-background-success light  ${workout.inProgress && workout.currentPhase === "WORK" ? "light-active" : ""}`}></div>
                    <div className="column is-12">
                        <p className="is-size-5 has-font-8bit mb-6">Round:{workout.currentRound}/{workout.totalRounds === Infinity ? "unlimited" : workout.totalRounds}</p>
                        {workout.currentPhase === "INACTIVE" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>select options/press start</span>}
                        {workout.currentPhase === "COUNTDOWN" && <span className={`has-font-8bit is-size-3 is-size-5-mobile ${workout.comboClass}`}>GET READY</span>}
                        <p className={`has-font-8bit is-size-3 is-size-5-mobile ${workout.comboClass}`}>

                            <span className={!workout.showCombo || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.combo.sequence.join("-")}</span>
                        </p>
                        <p className={`${workout.followupClass} has-font-8bit is-size-3 is-danger is-size-5-mobile`}>
                            <span className={!workout.showFollowup || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.followup.join("-")}</span>
                        </p>
                    </div>
                    <div className="column is-12 has-font-8bit">
                        <p className="is-size-2">
                            {timer.convertToTime(workout.currentTime)}
                        </p>
                    </div>
                    <div className="column button-container is-centered is-12 is-multiline">
                        {workout.inProgress && workout.timerActive ? <button className="button has-font-8bit " onClick={timer.pauseTimer}>Pause</button> : workout.inProgress ? <button className="button  has-font-8bit " onClick={timer.startTimer}>Play</button> : <button className="button  has-font-8bit " onClick={workoutFns.startWorkout}>Start</button>}

                        <button onClick={workoutFns.stopWorkout} disabled={workout.inProgress && workout.timerActive} className="button  has-font-8bit ">Restart</button>
                        <button className="button has-font-8bit" onClick={openModal} disabled={workout.inProgress}>Options</button>
                    </div>
                    {/* <button disabled={workout.inProgress} className="button has-font-8bit" onClick={workoutFns.resetOptions}>Reset</button> */}
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
