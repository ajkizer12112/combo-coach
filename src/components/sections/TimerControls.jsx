import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';
import { ModalContext } from '../../context/ModalContext';

const TimerControls = () => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext)
    const { modalActions } = useContext(ModalContext);
    const workoutActive = workout.inProgress && workout.timerActive;

    const PauseButton = () => <button className="button has-font-8bit" onClick={timer.pauseTimer}>Pause</button>
    const PlayButton = () => <button className="button has-font-8bit " onClick={timer.startTimer}>Play</button>
    const StartButton = () => <button className="button has-font-8bit " onClick={workoutFns.startWorkout}>Start</button>
    const RestartButton = () => <button onClick={workoutFns.stopWorkout} disabled={workout.inProgress && workout.timerActive} className="button has-font-8bit ">Restart</button>
    const OptionsButton = () => <button className="button has-font-8bit" onClick={() => modalActions.showModal("options")} disabled={workout.inProgress}>Options</button>
    return (
        <div className="column columns button-container is-centered is-12 is-multiline">
            {workoutActive ? <PauseButton /> : workout.inProgress ? <PlayButton /> : <StartButton />}
            <RestartButton />
            <OptionsButton />
        </div>
    )
};

export default TimerControls;
