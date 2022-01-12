import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'
import Options from '../components/sections/Options'


const Home = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    useEffect(() => {
        let timerId;
        const timePassed = workout.roundTime - workout.currentTime

        if (workout.currentPhase === "WORK" && timePassed % workout.roundWarningInterval === 0 && timePassed !== 0) {
            workoutActions.playWarning();
        }

        if (workout.timerActive) {
            if (workout.currentTime === 0) {
                workoutActions.runZero();
            }
            const timer = () => setTimeout(() => workoutActions.decrementTimer(), 1000);
            timerId = timer();
        }
        return () => {
            clearTimeout(timerId)
        }
    }, [workout])



    const rounds = [3, 4, 6, 8, 10, 12, 15, 20, Infinity];
    const restTimes = [30, 45, 60, 90, 120];
    const roundTimes = [60, 90, 120, 180, 300];
    const countDownTimes = [5, 10, 15, 30, 45, 60, 120];
    const roundWarningTimes = [10, 30, 60];

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
            title: "Round Warning Inverval",
            items: roundWarningTimes,
            dropdownOption: "roundWarningInterval"
        }
    ]


    return (
        <div className="section has-background-dark columns is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
            <div className="column has-background-grey-dark is-centered has-text-centered has-text-light columns is-multiline is-6 is-circle">
                <div className={`has-background-danger light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
                <div className={`has-background-success light  ${workout.inProgress && workout.currentPhase !== "WORK" ? "light-active" : ""}`}></div>
                <div className="column is-12">
                    <p className="is-size-2">Round: {workout.currentRound}/{workout.totalRounds === Infinity ? "∞" : workout.totalRounds}</p>
                </div>
                <div className="column is-12">
                    <p className="is-size-5">{workout.currentPhase}</p>
                </div>
                <div className="column is-12">
                    <p className="is-size-2">
                        {workoutActions.convertToTime(workout.currentTime)}
                    </p>
                </div>
                <div className="column columns is-centered is-12 is-multiline">

                    {workout.inProgress && workout.timerActive ? <button className="button" onClick={workoutActions.pauseTimer}>Pause</button> : workout.inProgress ? <button className="button" onClick={workoutActions.startTimer}>Play</button> : <button className="button" onClick={workoutActions.startWorkout}>Start</button>}

                    <button onClick={workoutActions.resetWorkout} disabled={workout.inProgress && workout.timerActive} className="button">Reset</button>

                </div>
            </div>
            <Options dropdowns={dropdowns} />

        </div >
    )
}

export default Home
