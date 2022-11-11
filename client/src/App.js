import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AvailableHikes from "./Components/AvailableHikes";
import AvailableHikesV2 from "./Components/AvailableHikesV2";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/Loginform";
import SignUpForm from "./Components/SignupForm";
import Homepage from "./Components/Homepage"
import './Styles/App.css';
import { useState, useEffect } from 'react';
import API from './API';
import Alert from '@mui/material/Alert';

function App() {
  /* A little Router trick */

  return (
    <Router>
      <Root />
    </Router>
  )
}

function Root() {
  const [loggedIn, setLoggedIn] = useState(false);        /* Boolean user login status (true,false) */
  const [loggedUser, setLoggedUser] = useState(false);    /* Contains logged user info */
  const [message, setMessage] = useState('');             /* Contains Welcome messages for login */

  /* Reload session after refresh */
  useEffect(() => {
    const checkAuth = async () => {
      try{
        const user = await API.getUserInfo();               // Reload session and retrieve user info
        setLoggedIn(true);
        setLoggedUser(user);
      }catch (err){
        // Not managed, just for reload session
      }
    };
    checkAuth();
  }, []); // Use effect with empty array is called only at the first render 

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedUser(user);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
      
    } catch (err) {
      setMessage({ msg: `${err}!`, type: 'error' });
    }
  };

  const handleSignUp = async (credentials) => {
    try {
      await API.addUser(credentials);
      setMessage({ msg: 'Check your email to validate your account, then perform the login', type: 'info' });
    } catch (err) {
      setMessage({ msg: `${err}!`, type: 'error' });
    }
  };

  const handleLogout = async () => {
    setLoggedIn(false);
    await API.logOut();
    setMessage('');

  };


  return (
    <Routes>
      <Route path='/' element={
      <>
      <Navbar handleLogout={handleLogout} isloggedIn={loggedIn} loggedUser={loggedUser} />
      {message && 
                <Alert severity={message.type} onClose={() => setMessage('')}>{message.msg}</Alert>
              }
       </>}>   
        {/* Outlets */}
        <Route path='' element={<Homepage />} />
        <Route path='hikes' element={<AvailableHikes loggedUser={loggedUser} />} />
        <Route path='hikesv2' element={<AvailableHikesV2 loggedUser={loggedUser} />} />
        <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} />} />
        <Route path='/register' element={<SignUpForm signUp={handleSignUp} />} />
      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</ Link>. </p></>} />
    </Routes >
  );
}

export default App;
