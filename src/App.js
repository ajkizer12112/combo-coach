import './App.css';
import React, { useMemo } from 'react';
import useWorkout from './hooks/useWorkout';
import { WorkoutContext } from './context/WorkoutContext';
import Home from './pages/Home';
import { DropdownContext } from './context/DropdownContext';
import useDropdown from './hooks/useDropdown';

function App() {

  const { workout, workoutActions } = useWorkout();
  const { dropdown, dropdownActions } = useDropdown();

  const workoutValue = useMemo(() => ({ workout, workoutActions }), [workout, workoutActions])
  const dropdownValue = useMemo(() => ({ dropdown, dropdownActions }), [dropdown, dropdownActions])

  return (
    <WorkoutContext.Provider value={workoutValue}>
      <DropdownContext.Provider value={dropdownValue}>
        <div className="App">
          <Home />
        </div>
      </DropdownContext.Provider>
    </WorkoutContext.Provider>
  );
}

export default App;
