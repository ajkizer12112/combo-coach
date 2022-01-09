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
            <button className="button" onClick={workoutActions.startWorkout}>Start</button>
        </div>
    )
}

export default Home
