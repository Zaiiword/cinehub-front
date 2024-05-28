/**
 * @file This is the main entry point for the React application.
 */

// Import necessary modules from their respective packages
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Menu from './app/Menu';
import Navigator from './app/Navigator';
import axios from 'axios';

/**
 * Axios interceptors are functions that Axios calls for every request.
 * You can use interceptors to transform the request before Axios sends it,
 * or to stop the request entirely.
 * Here we are using an interceptor to get the token from local storage and
 * add it to the Authorization header of the request before it is sent.
 */
axios.interceptors.request.use(
	/**
	 * This function is called before the request is sent.
	 * @param {Object} config - The Axios request configuration.
	 * @returns {Object} The modified Axios request configuration.
	 */
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

/**
 * Create a root React component on the `main` DOM element.
 */
const root = ReactDOM.createRoot(document.querySelector('main'));

/**
 * Render the `BrowserRouter`, `Menu`, and `Navigator` components inside this root component.
 */
root.render(
	<BrowserRouter>
		<Menu />
		<Navigator />
	</BrowserRouter>
);
