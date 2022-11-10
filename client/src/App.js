import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AvailableHikes from "./Components/AvailableHikes";
import AvailableHikesV2 from "./Components/AvailableHikesV2";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/Loginform";
import SignUpForm from "./Components/SignupForm";
import './App.css';
import { useState, useEffect } from 'react';
import API from './API';
import Alert from '@mui/material/Alert';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);        /* Boolean user login status (true,false) */
  const [loggedUser, setLoggedUser] = useState(false);    /* Contains logged user info */
  const [message, setMessage] = useState('');             /* Contains Welcome messages for login */

/* Reload session after refresh */
  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo();               // Reload session and retrieve user info
      setLoggedIn(true);
      setLoggedUser(user);
    };
    checkAuth();
  }, []); // Use effect with empty array is called only at the first render 

  const handleLogin = async (credentials) => {
    try {
      const user= await API.logIn(credentials);
      setLoggedUser(user);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
      
    } catch (err) {
      setMessage({ msg: 'Invalid email or password', type: 'error' });

    }
  };

  const handleSignUp = async (credentials) =>{
    try {
      const user= await API.addUser(credentials);
      setLoggedUser(user);
      setLoggedIn(true);
      //setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
    } catch (err) {
      //setMessage({ msg: 'Invalid username or password', type: 'danger' });

    }
  };

  const handleLogout = async () =>{
    setLoggedIn(false);
    await API.logOut();
    setMessage('');

  };


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={
            <>
              <Navbar handleLogout={handleLogout} isloggedIn={loggedIn} loggedUser={loggedUser} />
              {message && 
                <div><Alert severity={message.type} onClose={() => setMessage('')}>{message.msg}</Alert></div>
              }
              <Outlet />
            </>}>
            <Route path="/">
              <Route index key={"Available Hikes"} element={<AvailableHikes />} />
              <Route key={"Available Hikes v2"} path={"/available-hikes-v2"} element={<AvailableHikesV2 />} />
              <Route path="/login"  element={ <LoginForm login={handleLogin} isloggedIn={loggedIn} > </LoginForm> } ></Route>
              <Route path="/signup"  element={ <SignUpForm signUp ={handleSignUp}> </SignUpForm> } ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
