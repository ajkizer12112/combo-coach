import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { WorkoutContext } from '../../context/WorkoutContext'
import Dropdown from '../Dropdown'

const Options = ({ dropdowns }) => {
    const { workout, workoutActions: { workoutFns } } = useContext(WorkoutContext)
    return (
        <div className="column is-6 pl-6 is-12-mobile">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}
            <button disabled={workout.inProgress} className="button" onClick={workoutFns.resetOptions}>Reset</button>
        </div>
    )
}

export default Options
