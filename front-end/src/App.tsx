import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import ListDevice from './components/ListDevice';
import AddDevice from './components/AddDevice';

import {SeriesProps} from './interfaces/SeriesProps'



function App() {

  return (
    <div className="App">
      
      <AddDevice/>
      <ListDevice/>
      

      {/* <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="login" element={<LoginForm/>}/>
        <Route path="device" element={<ListDevice/>}/>
        <Route path="add" element={<AddDevice/>}/>
      </Routes> */}
    
    </div>
  );
}

export default App;
