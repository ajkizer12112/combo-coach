import './App.css';
import React, { useMemo } from 'react';

import useWorkout from './hooks/useWorkout';
import useDropdown from './hooks/useDropdown';


import Home from './pages/Home';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <div className="App">

        <Home />
      </div>
    </ContextProvider>
  );
}

export default App;
