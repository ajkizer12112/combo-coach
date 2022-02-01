import React, { useEffect, useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const TimerDisplay = () => {
    const { workout, workoutActions: { timer } } = useContext(WorkoutContext)

    return <div className="column is-12 has-font-8bit">
        <p className="is-size-2">
            {timer.convertToTime(workout.currentTime)}
        </p>
    </div>
};

export default TimerDisplay;
