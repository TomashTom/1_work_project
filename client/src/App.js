import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import UserManager from './components/UserManager';
import Apie from './components/Apie';
import Kontaktai from './components/Kontaktai';
import Paraiskos from './components/Paraiskos';
import Paslaugos from './components/Paslaugos';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<UserManager />} />
        <Route path="/apie" element={<Apie />} />
        <Route path="/kontaktai" element={<Kontaktai />} />
        <Route path="/paraiskos" element={<Paraiskos />} />
        <Route path="/paslaugos" element={<Paslaugos />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
