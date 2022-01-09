import logo from './logo.svg';
import './App.css';
import React, { useMemo } from 'react';
import useWorkout from './hooks/useWorkout';
import { WorkoutContext } from './context/WorkoutContext';
import Home from './pages/Home';

function App() {

  const { workout, workoutActions } = useWorkout();

  const workoutValue = useMemo(() => ({ workout, workoutActions }), [workout, workoutActions])

  return (
    <WorkoutContext.Provider value={workoutValue}>
      <div className="App">
        <Home />
      </div>
    </WorkoutContext.Provider>
  );
}

export default App;
