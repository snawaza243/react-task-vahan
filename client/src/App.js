import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import EditEntity from './components/EditEntity ';
import AddEntity from './components/AddEntity';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<EditEntity />} />
        <Route path="/add-entity" element={<AddEntity />} />
      </Routes>
    </Router>
  );
};

export default App;
