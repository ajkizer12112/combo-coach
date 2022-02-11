import React, { useEffect, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { WorkoutContext } from '../../context/WorkoutContext';

const TimerDisplay = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
    const { profileFns } = useContext(AccountContext)

    useEffect(() => {
        let timerId;
        workoutActions.timer.runWarningChecks();
        if (!workout.timerActive) return

        if (workout.currentTime === 0) {
            workoutActions.timer.runZero();
            if (workout.currentRound === workout.totalRounds) {
                const data = {
                    roundsCompleted: workout.totalRounds,
                    maneuverTracker: workout.maneuverTracker
                }
                profileFns.completeWorkout(data)
            }
        }
        const timeout = () => setTimeout(() => workoutActions.timer.decrementTimer(), 10);
        timerId = timeout();

        return () => {
            clearTimeout(timerId)
        }
    }, [workout])

    return <div className="column is-12 has-font-8bit">
        <p className="is-size-2">
            {workoutActions.timer.convertToTime(workout.currentTime)}
        </p>
    </div>
};

export default TimerDisplay;
