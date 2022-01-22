import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { WorkoutContext } from '../../context/WorkoutContext'
import Dropdown from '../Dropdown'

const Options = ({ dropdowns }) => {
    const { workout, workoutActions: { workoutFns } } = useContext(WorkoutContext)
    return (
        <div className="column is-12 is-8-desktop mx-auto ">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}

        </div>
    )
}

export default Options
