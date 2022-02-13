import React, { useContext } from 'react'
import { WorkoutContext } from '../../context/WorkoutContext'

const StatusText = () => {
    const { workout } = useContext(WorkoutContext)
    return (
        <div>
            {workout.currentPhase === "INACTIVE" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>Press Start</span>}
            {workout.currentPhase === "COUNTDOWN" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>GET READY</span>}
            {workout.currentPhase === "REST" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>REST</span>}
            {workout.currentPhase === "WORK" && <span className={`has-font-8bit is-size-5 is-size-5-mobile ${workout.comboClass}`}>FIGHT!</span>}
        </div>
    )
}

export default StatusText