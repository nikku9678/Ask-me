// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Askme from './pages/Askme';
import Questions from './pages/Question';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/askme" element={<Askme/>} />
      </Routes>
    </Router>
  );
}

export default App;
