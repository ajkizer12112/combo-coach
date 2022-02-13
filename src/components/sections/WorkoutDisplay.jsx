import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const WorkoutDisplay = () => {
    const { workout } = useContext(WorkoutContext)
    return (
        <>
            <p className={`has-font-8bit is-size-2 is-size-5-mobile ${workout.comboClass}`}>
                <span className={!workout.showCombo || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.combo.sequence.join("-")}</span>
            </p>
            <p className={`${workout.followupClass} has-font-8bit is-size-2 is-danger is-size-5-mobile`}>
                <span className={!workout.showFollowup || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.followup.join("-")}</span>
            </p>
        </>
    )
};

export default WorkoutDisplay;
