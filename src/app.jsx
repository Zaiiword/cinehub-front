import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Menu from './app/Menu';
import Navigator from './app/Navigator';
import axios from 'axios';

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(
	<BrowserRouter>
		<Menu />
		<Navigator />
	</BrowserRouter>
);
