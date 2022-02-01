import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const Lights = () => {
    const { workout } = useContext(WorkoutContext)
    return <><div className={`has-background-danger light ${workout.inProgress && workout.currentPhase === "REST" ? "light-active" : ""}`}></div>
        <div className={`has-background-success light  ${workout.inProgress && workout.currentPhase === "WORK" ? "light-active" : ""}`}></div></>;
};

export default Lights;
