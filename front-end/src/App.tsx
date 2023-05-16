import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Device from "./device"
import Login from "./login"
import {SeriesProps} from './interfaces/SeriesProps'
import Form from './components/Form'
import List from './components/List'



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