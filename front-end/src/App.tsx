import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
// import LoginForm from './components/LoginForm';
import ListDevice from './components/tabledevice.component';
import AddDevice from './components/adddevice.compoment';
import LoginForm from './components/login.component';
import LoginPage from './pages/login.page';
import DevicePage from './pages/device.page';
import { DeviceProps } from './interfaces/DeviceProps';

const App: React.FC = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([]);

  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/devicepage" element={<DevicePage />} />

          {/* <Route path="/logintest" element={<LoginForm />} /> */}

          {/* <Route path="/devicelist" element={<AddDevice devices={devices} setDevices={setDevices} /> } /> */}
        </Routes>
      </div>


    </div>
  );
};

// style={{
//   display: "block",
//   justifyContent: "center",
//   alignItems: "center",
// }}

// function App() {

//   return (
//     <div className="App">

//       <AddDevice/>
//       <ListDevice/>


//       {/* <Routes>
//         <Route path="/" element={<LoginForm/>}/>
//         <Route path="login" element={<LoginForm/>}/>
//         <Route path="device" element={<ListDevice/>}/>
//         <Route path="add" element={<AddDevice/>}/>
//       </Routes> */}

//     </div>
//   );
// }

export default App;
