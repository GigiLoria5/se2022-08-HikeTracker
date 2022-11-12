import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AvailableHikesV2 from "./Components/AvailableHikesV2";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route key={"Available Hikes"} exact path={"/available-hikes"} element={<AvailableHikesV2/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
