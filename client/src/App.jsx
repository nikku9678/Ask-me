// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Askme from './pages/Askme';
import Questions from './pages/Question';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Askme/>} />
        <Route path="/display" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
