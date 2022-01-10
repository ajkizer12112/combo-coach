import React, { useContext, useState, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'
import { DropdownContext } from '../context/DropdownContext'

const Home = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
    const { dropdown, dropdownActions } = useContext(DropdownContext)

    useEffect(() => {
        let timerId;

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

    const rounds = [3, 4, 6, 8, 10, 12, 15, 20, 100]
    return (
        <div className="section columns is-multiline" onClick={() => dropdown.showRound && dropdownActions.toggle("showRound", false)}>
            <div className={`dropdown ${dropdown.showRound ? "is-active" : ""}`}>
                <div className="dropdown-trigger" onClick={() => dropdownActions.toggle("showRound", true)}>
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Number of Rounds</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">

                        {rounds.map(round => <a onClick={() => workoutActions.changeOptions("totalRounds", round)} key={`${round}-dropdown`} href="#" className="dropdown-item">
                            {round}
                        </a>)}




                    </div>
                </div>
            </div>
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
