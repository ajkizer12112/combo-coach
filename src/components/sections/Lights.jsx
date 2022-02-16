import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';
import StatusText from './StatusText';

const Lights = () => {
    const { workout } = useContext(WorkoutContext)
    return (
        <div className="columns column is-10 is-multiline is-mobile is-centered">
            <div className="column is-10 has-text-centered">
                <StatusText />
            </div>
            <div className={`has-background-danger column is-6 is-rounded light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
            <div className={`has-background-success column is-6 is-rounded light ${workout.inProgress && workout.currentPhase === "WORK" ? "light-active" : ""}`}></div>
        </div>)
};

export default Lights;
