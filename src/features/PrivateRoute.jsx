/**
 * @file
 * This file contains the PrivateRoute component. This component checks if the user is authenticated.
 * If the user is authenticated, it renders the children components. If the user is not authenticated,
 * it redirects the user to the login page.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component.
 * This component checks if the user is authenticated. If the user is authenticated, it renders the children components.
 * If the user is not authenticated, it redirects the user to the login page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children components to be rendered if the user is authenticated.
 * @returns {JSX.Element} If the user is authenticated, it returns the children components. Otherwise, it redirects the user to the login page.
 */
function PrivateRoute({ children }) {
	const isAuthenticated = sessionStorage.getItem('isAuthenticated');

	return isAuthenticated ? children : <Navigate replace to="/login" />;
}

export default PrivateRoute;
