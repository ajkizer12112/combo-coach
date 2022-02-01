import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const TimerControls = ({ openModal }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext)
    return <div className="column button-container is-centered is-12 is-multiline">
        {workout.inProgress && workout.timerActive ? <button className="button has-font-8bit " onClick={timer.pauseTimer}>Pause</button> : workout.inProgress ? <button className="button  has-font-8bit " onClick={timer.startTimer}>Play</button> : <button className="button  has-font-8bit " onClick={workoutFns.startWorkout}>Start</button>}

        <button onClick={workoutFns.stopWorkout} disabled={workout.inProgress && workout.timerActive} className="button  has-font-8bit ">Restart</button>
        <button className="button has-font-8bit" onClick={openModal} disabled={workout.inProgress}>Options</button>
    </div>
};

export default TimerControls;
