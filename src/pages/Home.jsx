import React, { useContext } from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

const Home = () => {
    const { workout, workoutActions } = useContext(WorkoutContext)
    console.log(workout);
    return (
        <div>

        </div>
    )
}

export default Home
