import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
	const isAuthenticated = sessionStorage.getItem('isAuthenticated');

	return isAuthenticated ? children : <Navigate replace to="/login" />;
}

export default PrivateRoute;
