import React from 'react';
import './App.css'; // jei dar nori naudoti stilių
import UserManager from './components/UserManager';

function App() {
  return (
    <div className="App">
      <h1>Tomash Shop MERN CRUD</h1>
      <UserManager />
    </div>
  );
}

export default App;
