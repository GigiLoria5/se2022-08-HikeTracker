import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AvailableHikes from "./Components/AvailableHikes";
import AvailableHikesV2 from "./Components/AvailableHikesV2";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route key={"Available Hikes"} exact path={"/available-hikes"} element={<AvailableHikes/>} />
          <Route key={"Available Hikes v2"} exact path={"/available-hikes-v2"} element={<AvailableHikesV2/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
