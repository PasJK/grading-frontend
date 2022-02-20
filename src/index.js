// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Grading from './components/Grading';
import Profile from './components/Profile';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/grading" element={<Grading/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);