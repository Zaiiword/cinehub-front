import Navigator from './Navigator';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.querySelector('main'));
root.render(
	<BrowserRouter>
		<Navigator />
	</BrowserRouter>
);
