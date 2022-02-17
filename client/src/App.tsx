import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './features/auth/components/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-salmon to-coral">
      <div className="header">
        Nonsense in a Hat
      </div>

      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/home" element={ <HomePage /> }/>
      </Routes>
    </div>
  );
}

export default App;
