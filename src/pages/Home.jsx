import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'
import Dropdown from '../components/Dropdown'

const Home = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    useEffect(() => {
        let timerId;
        const timePassed = workout.roundTime - workout.currentTime

        if (timePassed % workout.roundWarningInterval === 0 && timePassed !== 0) {
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

    const convertToTime = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = workout.currentTime - minutes * 60
        if (seconds < 10) seconds = `0${seconds}`

        return `${minutes}:${seconds}`
    }

    const rounds = [3, 4, 6, 8, 10, 12, 15, 20, 100];
    const restTimes = [30, 45, 60, 90, 120];
    const roundTimes = [60, 90, 120, 180, 300];
    const countDownTimes = [5, 10, 15, 30, 45, 60];
    const roundWarningTimes = [30, 60, 90, 120];

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
        <div className="section columns is-multiline" onClick={() => dropdownActions.closeDropdowns()}>
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}

            {workout.isComplete && <p>GRATS!</p>}
            <div className="column is-12">
                <p className="is-size-2">Round: {workout.currentRound}/{workout.totalRounds}</p>
            </div>
            <div className="column is-12">
                <p className="is-size-5">{workout.currentPhase}</p>
            </div>
            <div className="column is-12">
                <p className="is-size-2">
                    {convertToTime(workout.currentTime)}
                </p>
            </div>
            <button className="button" disabled={workout.inProgress} onClick={workoutActions.startWorkout}>Start Workout</button>
            <br />
            <button disabled={!workout.inProgress} className="button" onClick={workoutActions.startTimer}>Play</button>
            <button disabled={!workout.inProgress} className="button" onClick={workoutActions.pauseTimer}>Pause</button>
            <button onClick={workoutActions.resetWorkout} disabled={workout.inProgress && workout.timerActive} className="button">Reset</button>
        </div >
    )
}

export default Home
