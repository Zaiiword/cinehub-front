/**
 * @file
 * This file contains the Logout component which is responsible for handling user logout.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Logout component.
 * This component is responsible for handling user logout.
 * It removes the authentication token from local storage and session storage, then redirects the user to the login page.
 */
export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		// Clear authentication information
		// You will need to replace this line with your own logic for clearing authentication information
		localStorage.removeItem('token');
		sessionStorage.removeItem('isAuthenticated');

		// Redirect to login page
		navigate('/login');
	}, [navigate]);

	return null;
}
