import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AvailableHikes from "./Components/AvailableHikes";
import AvailableHikesV2 from "./Components/AvailableHikesV2";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/Loginform";
import SignUpForm from "./Components/SignupForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={
            <>
              <Navbar />
              <Outlet />
            </>}>
            <Route path="/">
              <Route index key={"Available Hikes"} element={<AvailableHikes />} />
              <Route key={"Available Hikes v2"} path={"/available-hikes-v2"} element={<AvailableHikesV2 />} />
              <Route path="/login" element={ <LoginForm> </LoginForm> } ></Route>
              <Route path="/signup" element={ <SignUpForm> </SignUpForm> } ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
