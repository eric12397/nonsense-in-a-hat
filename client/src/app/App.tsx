import React from 'react';
import './App.css';
import HomePage from '../components/HomePage';
import LoginPage from '../features/auth/components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import GamesList from '../features/game/components/GamesList';
import HostGame from '../features/game/components/HostGame';
import GameBoard from '../features/game/components/GameBoard';

function App() {
  return (
    <div className="h-screen bg-gradient-to-b from-salmon to-coral">
      <div className="header">
        Nonsense in a Hat
      </div>

      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/home" element={ <HomePage /> }>
          <Route path="games" element={ <GamesList /> } />
          <Route path="games/host" element={ <HostGame /> } />
        </Route>
        <Route path="/games/:id" element={ <GameBoard /> } />
      </Routes>
    </div>
  );
}

export default App;
