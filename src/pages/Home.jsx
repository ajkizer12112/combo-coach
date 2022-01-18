import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'
import { peakaboo_basic, fundamentals } from '../combinations/fundamentals'


const followupChance = 0.4

const Home = () => {
    const { workout, workoutActions: { timer, workoutFns, sounds } } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    const [showCombo, setShowCombo] = useState(false);
    const [followup, setFollowup] = useState(false);

    const shouldShowCombo = () => {
        if (!workout.timerActive || workout.currentPhase !== "WORK") {
            setShowCombo(false);
        } else {
            setShowCombo(true);
        }
    }

    const rollForFollowup = () => {
        const value = Math.ceil(Math.random() * 1000)
        const threshold = 1000 - 1000 * followupChance
        if (value > threshold) {
            setFollowup(true);
            sounds.playPowerup();
            setTimeout(() => setFollowup(false), 4000)
        }
    }

    useEffect(() => {
        let timerId;

        timer.runWarningChecks();

        if (workout.timerActive) {
            shouldShowCombo()
            if (workout.currentTime === 0) {
                timer.runZero();
            }

            if (workout.currentTime % 3 === 0 && workout.currentTime !== 0 && workout.currentTime !== workout.roundTime && workout.currentPhase === "WORK") {
                rollForFollowup();
            }

            const timeout = () => setTimeout(() => timer.decrementTimer(), 1000);

            timerId = timeout();
        }
        return () => {
            clearTimeout(timerId)
        }
    }, [workout])


    const rounds = [3, 4, 6, 8, 10, 12, 24, Infinity];
    const restTimes = [30, 45, 60, 90, 120];
    const roundTimes = [120, 180, 300];
    const countDownTimes = [10, 30, 60];
    const combos = [fundamentals, peakaboo_basic]


    const dropdowns = [
        {
            title: "Number of Rounds",
            items: rounds,
            dropdownOption: "totalRounds"
        },
        {
            title: "Rest Time",
            items: restTimes,
            dropdownOption: "restTime"
        },
        {
            title: "Time in Round",
            items: roundTimes,
            dropdownOption: "roundTime"
        },
        {
            title: "Countdown",
            items: countDownTimes,
            dropdownOption: "countDown"
        },
        {
            title: "Combo Selection",
            items: combos,
            dropdownOption: "combos"
        }
    ]

    return (
        <div className="section has-background-dark columns is-justify-content-center is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
            <div className="column has-background-grey-dark is-align-items-center is-centered has-text-centered has-text-light columns is-multiline is-mobile is-6 is-circle">
                <div className={`has-background-danger light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
                <div className={`has-background-success light  ${workout.inProgress && workout.currentPhase === "WORK" ? "light-active" : ""}`}></div>
                <div className="column is-12">
                    <p className="is-size-2">Round: {workout.currentRound}/{workout.totalRounds === Infinity ? "∞" : workout.totalRounds}</p>
                    <p className="is-size-4">
                        {workout.combo.sequence.join(" - ")}
                    </p>

                    <p className={`is-size-3 has-text-danger followup ${followup ? "is-active" : "inactive"}`}>
                        {showCombo && workout.combo.followup.join(" - ")}
                    </p>

                </div>
                <div className="column is-12">
                    <p className="is-size-2">
                        {timer.convertToTime(workout.currentTime)}
                    </p>
                </div>
                <div className="column columns is-centered is-12 is-multiline">
                    {workout.inProgress && workout.timerActive ? <button className="button" onClick={timer.pauseTimer}>Pause</button> : workout.inProgress ? <button className="button" onClick={timer.startTimer}>Play</button> : <button className="button" onClick={workoutFns.startWorkout}>Start</button>}

                    <button onClick={workoutFns.stopWorkout} disabled={workout.inProgress && workout.timerActive} className="button">Restart</button>

                </div>
            </div>
            <Options dropdowns={dropdowns} />

        </div >
    )
}

export default Home
