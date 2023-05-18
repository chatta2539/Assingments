import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/login.page';
import DevicePage from './pages/device.page';
import RegisterUser from './pages/registeruser.page';
import RegisterDevice from './pages/add.device.page';
import EditDevice from './pages/edit.device.page';

const App: React.FC = () => {

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterUser />} />
          <Route path="/devicepage" element={<DevicePage />} />
          <Route path="/adddevice" element={<RegisterDevice />} />
          <Route path="/devicepage/editdevice/:id" element={<EditDevice />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
