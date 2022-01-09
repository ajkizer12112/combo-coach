import React, { useContext, useEffect } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

const Home = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
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
    return (
        <div className="section columns is-multiline">
            {workout.isComplete && <p>GRATS!</p>}
            <div className="column is-12">
                <p className="is-size-2">Round: {workout.currentRound}</p>
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
        </div>
    )
}

export default Home
