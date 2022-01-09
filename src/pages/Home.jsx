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
            const timer = () => setTimeout(() => workoutActions.decrementTimer(), 1);
            timerId = timer();
        }
        return () => {
            clearTimeout(timerId)
        }
    }, [workout])
    return (
        <div>
            {workout.isComplete && <p>GRATS!</p>}
            <p className="is-size-2">Round: {workout.currentRound}</p>
            {workout.currentPhase}
            {workout.currentTime}
            <button className="button" disabled={workout.inProgress} onClick={workoutActions.startWorkout}>Start Workout</button>
            <br />
            <button disabled={!workout.inProgress} className="button" onClick={workoutActions.startTimer}>Play</button>
            <button disabled={!workout.inProgress} className="button" onClick={workoutActions.pauseTimer}>Pause</button>
        </div>
    )
}

export default Home
