import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'
import { fundamentals } from '../combinations/fundamentals'

const Home = () => {
    const { workout, workoutActions: { timer, workoutFns, sounds } } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)
    const [followup, setFollowup] = useState(false)
    useEffect(() => {
        let timerId;

        timer.runWarningChecks();
        if (workout.timerActive) {
            if (workout.currentTime === 0) {
                timer.runZero();
            }

            const roll = Math.ceil(Math.random() * 5)

            if (roll === 5 && workout.currentTime % 3 === 0 && workout.currentTime !== 0 && workout.currentPhase === "WORK") {
                setFollowup(true)
                setTimeout(() => {
                    setFollowup(false);
                }, 2500)
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
    ]


    return (
        <div className="section has-background-dark columns is-justify-content-center is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
            <div className="column has-background-grey-dark is-align-items-center is-centered has-text-centered has-text-light columns is-multiline is-mobile is-6 is-circle">
                <div className={`has-background-danger light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
                <div className={`has-background-success light  ${workout.inProgress && workout.currentPhase === "WORK" ? "light-active" : ""}`}></div>
                <div className="column is-12">
                    <p className="is-size-2">Round: {workout.currentRound}/{workout.totalRounds === Infinity ? "∞" : workout.totalRounds}</p>



                    {workout.timerActive && workout.currentPhase === "WORK" && workout.combo.sequence && workout.combo.sequence.map(action => <>{action}</>)}
                    {followup && workout.timerActive && workout.currentPhase === "WORK" && workout.combo.sequence && workout.combo.followup.map(action => <>{action}</>)}
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
