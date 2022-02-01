import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './features/auth/components/LoginPage';

function App() {
  return (
    <div className="App">
      <div className="header">
        Nonsense in a Hat
      </div>
      <LoginPage></LoginPage>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
