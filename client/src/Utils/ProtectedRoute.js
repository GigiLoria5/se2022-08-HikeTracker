import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * 
 * @param {boolean} isLoggedIn value true if the user is authenticated, false otherwise 
 * @param {String} loggedUserRole one of the possible user roles (hiker, emergency_operator, platform_manager, local_guide, hut_worker)
 * @param {Array<String>} roleAllowed array containing all types of users who can access the route (example: ["hiker", "hut_worker"])
 * @returns protected route if access is possible, otherwise redirect to homepage
 */
const ProtectedRoute = ({ isLoggedIn, loggedUserRole, roleAllowed }) => {
    if (!isLoggedIn || (isLoggedIn && roleAllowed.includes(loggedUserRole))) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;