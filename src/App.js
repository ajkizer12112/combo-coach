import './App.css';
import React, { useMemo } from 'react';

import useWorkout from './hooks/useWorkout';
import useAuth from './hooks/useAuth';
import useDropdown from './hooks/useDropdown';

import { AuthContext } from './context/AuthContext';
import { WorkoutContext } from './context/WorkoutContext';
import { DropdownContext } from './context/DropdownContext';

import Home from './pages/Home';
import ContextProvider from './context/ContextProvider';

function App() {
  const { workout, workoutActions } = useWorkout();
  const { dropdown, dropdownActions } = useDropdown();
  const { auth, login, logout } = useAuth

  const workoutValue = useMemo(() => ({ workout, workoutActions }), [workout, workoutActions])
  const dropdownValue = useMemo(() => ({ dropdown, dropdownActions }), [dropdown, dropdownActions])
  const authValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout])

  return (
    <ContextProvider>
      <div className="App">
        <Home />
      </div>
    </ContextProvider>
  );
}

export default App;
