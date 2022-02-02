import React, { useContext } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';

const WorkoutDisplay = () => {
    const { workout } = useContext(WorkoutContext)
    return (
        <div className="column is-12">
            <p className="is-size-5 has-font-8bit mb-6">Round:{workout.currentRound}/{workout.totalRounds === Infinity ? "unlimited" : workout.totalRounds}</p>
            {workout.currentPhase === "INACTIVE" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>select options/press start</span>}
            {workout.currentPhase === "COUNTDOWN" && <span className={`has-font-8bit is-size-3 is-size-5-mobile ${workout.comboClass}`}>GET READY</span>}
            <p className={`has-font-8bit is-size-3 is-size-5-mobile ${workout.comboClass}`}>

                <span className={!workout.showCombo || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.combo.sequence.join("-")}</span>
            </p>
            <p className={`${workout.followupClass} has-font-8bit is-size-3 is-danger is-size-5-mobile`}>
                <span className={!workout.showFollowup || workout.currentPhase !== "WORK" ? "is-invisible" : ""}>{workout.followup.join("-")}</span>
            </p>
        </div>
    )
};

export default WorkoutDisplay;
