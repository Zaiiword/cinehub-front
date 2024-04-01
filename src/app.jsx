import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Menu from './app/Menu';
import Navigator from './app/Navigator';

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(
	<BrowserRouter>
		<Menu />
		<Navigator />
	</BrowserRouter>
);
