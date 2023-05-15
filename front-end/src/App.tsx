import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Device from "./device"
import Login from "./login"



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="device" element={<Device/>}/>

      </Routes>
    
    </div>
  );
}

export default App;
