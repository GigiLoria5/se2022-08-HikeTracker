import { React, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import API from '../API';

/**
 * 
 * @param {Array<String>} rolesAllowed array containing all types of users who can access the route (example: ["hiker", "hut_worker"])
 * @returns protected route if access is possible, otherwise redirect to homepage
 */
const ProtectedRoute = ({ rolesAllowed }) => {
    const [loggedIn, setLoggedIn] = useState(false);        /* Boolean user login status (true,false) */
    const [loggedUser, setLoggedUser] = useState(false);    /* Contains logged user info */
    const [sessionReload, setSessionReload] = useState(true);

    /* Reload session after refresh */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await API.getUserInfo();               // Reload session and retrieve user info
                setLoggedIn(true);
                setLoggedUser(user);
                setSessionReload(false);
            } catch (err) {
                // Not managed, just for reload session
                setSessionReload(false);
            }
        };
        checkAuth();
    }, []); // Use effect with empty array is called only at the first render 

    if (sessionReload)
        return null;
    else {
        if (!loggedIn || (loggedIn && !rolesAllowed.includes(loggedUser.role))) {
            return <Navigate to="/" />;
        }
        return <Outlet />;
    }
};

export default ProtectedRoute;