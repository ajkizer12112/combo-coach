import './App.css';
import React from 'react';

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
