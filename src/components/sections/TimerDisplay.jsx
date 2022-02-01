import React, { useEffect, useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const TimerDisplay = () => {
    const { workout, workoutActions: { timer, workoutFns, sounds } } = useContext(WorkoutContext)
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
    return <div className="column is-12 has-font-8bit">
        <p className="is-size-2">
            {timer.convertToTime(workout.currentTime)}
        </p>
    </div>
};

export default TimerDisplay;
