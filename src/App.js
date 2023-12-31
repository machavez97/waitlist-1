import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { getAuth, signOut } from 'firebase/auth';


import { Routes, Route, useNavigate} from 'react-router-dom';
import InputForm from './components/InputForm';
import HomePage from './components/homepage';
import Login from './components/loginpage';
import Search from './components/searchpage';
import SelectedResult from './components/selectedResult';





function App() {
const navigate = useNavigate();
const routeChange = (path) => {
  navigate(path);
};


const handleLogout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      
    })
    .catch((error) => {
      // Handle sign-out error
      console.log('Error signing out:', error);
    });
};
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage handleLogout={handleLogout} />} />
          <Route path="/signup" element={<InputForm/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/search" element={<Search handleLogout={handleLogout} />} />
          <Route path="/result/:id" element={<SelectedResult handleLogout={handleLogout} />} />


        </Routes>


      
    </div>
  );
}

export default App;
