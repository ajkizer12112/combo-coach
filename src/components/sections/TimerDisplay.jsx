import React, { useEffect, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { WorkoutContext } from '../../context/WorkoutContext';

const TimerDisplay = () => {
    const { workout, timer } = useContext(WorkoutContext)
    const { profileFns, account } = useContext(AccountContext)

    useEffect(() => {
        let timerId;
        timer.runWarningChecks();
        if (!workout.timerActive) return

        if (workout.currentTime === 0) {
            timer.runZero();
            if (workout.currentRound === workout.totalRounds && account.isAuthenticated) {
                const data = {
                    roundsCompleted: workout.totalRounds,
                    maneuverTracker: workout.maneuverTracker
                }

                profileFns.completeWorkout(data)
            }
        }

        const timeout = () => setTimeout(() => timer.decrementTimer(), 1000);
        timerId = timeout();

        return () => {
            clearTimeout(timerId)
        }
    }, [workout.currentTime, workout.timerActive])

    return <div className="column is-12 has-font-8bit">
        <p className="is-size-6 mb-2 has-font-8bit">Round:{workout.currentRound}/{workout.totalRounds === Infinity ? "unlimited" : workout.totalRounds}</p>
        <p className="is-size-2">
            {timer.convertToTime(workout.currentTime)}
        </p>
    </div>
};

export default TimerDisplay;
