import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AvailableHikes from "./Components/AvailableHikes";
import AvailableHikesV2 from "./Components/AvailableHikesV2";
import Homepage from './Components/Homepage';
import MyNavbar from './Components/Navbar';
import LoginForm from "./Components/Loginform";
import SignUpForm from "./Components/SignupForm";
import './Styles/App.css';
import { useState, useEffect } from 'react';
import API from './API';

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
      const user = await API.logIn(credentials);
      setLoggedUser(user);
      setLoggedIn(true);
      //setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });

    } catch (err) {
      //setMessage({ msg: 'Invalid username or password', type: 'danger' });

    }
  };

  const handleSignUp = async (credentials) => {
    try {
      const user = await API.addUser(credentials);
      setLoggedUser(user);
      setLoggedIn(true);
      //setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });

    } catch (err) {
      //setMessage({ msg: 'Invalid username or password', type: 'danger' });

    }
  }

  const handleLogout = async () => {
    setLoggedIn(false);
    await API.logOut();
  }


  return (
    <Routes>
      <Route path='/' element={<MyNavbar handleLogout={handleLogout} isloggedIn={loggedIn} loggedUser={loggedUser} />}>
        {/* Outlets */}
        <Route path='' element={<Homepage />} />
        <Route path='hikes' element={<AvailableHikes />} />
        <Route path='hikesv2' element={<AvailableHikesV2 />} />
        <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} />} />
        <Route path='/register' element={<SignUpForm signUp={handleSignUp} />} />
      </Route>

      {/* The following routes will NOT have the navbar */}
      <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</ Link>. </p></>} />
    </Routes >
  );
}

export default App;
