import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/Auth/Loginform";
import SignUpForm from "./Components/Auth/SignupForm";
import Homepage from "./Components/Homepage"
import AddHike from "./Components/LocalGuide/AddHike"
import AddHut from './Components/Hut/AddHut';
import './Styles/App.css';
import API from './API';
import ProtectedRoute from './Utils/ProtectedRoute';
import HikesContainer from './Components/Hikes/HikesContainer';
import HikeDetails from './Components/Hikes/HikeDetails';
import AddParking from "./Components/LocalGuide/AddParking"
import HutsContainer from './Components/Hut/HutsContainer';
import HutDetails from './Components/Hut/HutDetails';

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
            try {
                const user = await API.getUserInfo();               // Reload session and retrieve user info
                setLoggedIn(true);
                setLoggedUser(user);
            } catch (err) {
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

        } catch (err) {
            const obj = JSON.parse(err);
            setMessage({ msg: `${obj.error}!`, type: 'error' });
        }
    };

    const handleSignUp = async (credentials) => {
        try {
            await API.addUser(credentials);
            setMessage({ msg: 'Check your email to validate your account, then perform the login', type: 'info' });
        } catch (err) {
            const obj = JSON.parse(err);
            setMessage({ msg: `${obj.error}!`, type: 'error' });
        }
    };

    const handleLogout = async () => {
        setLoggedIn(false);
        setLoggedUser(false);
        await API.logOut();
        setMessage('');
    };

    return (
        <Routes>
            <Route path='/' element={<Navbar handleLogout={handleLogout} isloggedIn={loggedIn} loggedUser={loggedUser} message={message} setMessage={setMessage} />} >
                {/* Outlets */}
                <Route path='' element={<Homepage />} />
                <Route path='/hikes' element={<HikesContainer />} />
                <Route path='/hikes/:hikeId' element={<HikeDetails isloggedIn={loggedIn} loggedUser={loggedUser} />} />
                <Route path='/huts' element={<ProtectedRoute isLoggedIn={loggedIn} loggedUserRole={loggedUser.role} rolesAllowed={['hiker', 'local_guide']} />} >
                    <Route path="" element={<HutsContainer />} />
                </Route>
                <Route path='/huts/:hutId' element={<ProtectedRoute isLoggedIn={loggedIn} loggedUserRole={loggedUser.role} rolesAllowed={['hiker', 'local_guide']} />} >
                    <Route path="" element={<HutDetails isloggedIn={loggedIn} loggedUser={loggedUser} />} />
                </Route>

                <Route path='/login' element={<LoginForm login={handleLogin} isloggedIn={loggedIn} message={message} setMessage={setMessage} />} />
                <Route path='/register' element={<SignUpForm signUp={handleSignUp} message={message} setMessage={setMessage} />} />

                <Route path='/local-guide-add-hikes' element={<ProtectedRoute isLoggedIn={loggedIn} loggedUserRole={loggedUser.role} rolesAllowed={['local_guide']} />} >
                    <Route path="" element={<AddHike />} />
                </Route>
                <Route path='/local-guide-add-hut' element={<ProtectedRoute isLoggedIn={loggedIn} loggedUserRole={loggedUser.role} rolesAllowed={['local_guide']} />} >
                    <Route path="" element={<AddHut message={message} setMessage={setMessage} />} />
                </Route>
                <Route path='/local-guide-add-parking' element={<ProtectedRoute isLoggedIn={loggedIn} loggedUserRole={loggedUser.role} rolesAllowed={['local_guide']} />} >
                    <Route path="" element={<AddParking />} />
                </Route>
            </Route>

            {/* The following routes will NOT have the navbar */}
            <Route path='*' element={<><h1>Oh no! Page not found.</h1> <p>Return to our <Link to="/" >homepage</ Link>. </p></>} />
        </Routes >
    );
}

export default App;
