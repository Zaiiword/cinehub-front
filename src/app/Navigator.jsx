import { Routes, Route } from 'react-router-dom';
import MovieList from '../features/movie/MovieList';
import Search from './Search';
import MovieDetail from '../features/movie/MovieDetail';
import UserDetail from '../features/user/UserDetail';

import Login from './Login';
import Logout from './Logout';
import PrivateRoute from '../features/PrivateRoute';
import { UserWatchlist } from '../features/user/UserWatchlist';

export default function Navigator() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<MovieList />
					</PrivateRoute>
				}
			/>
			<Route
				path="/movie/:id"
				element={
					<PrivateRoute>
						<MovieDetail />
					</PrivateRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<UserDetail />
					</PrivateRoute>
				}
			/>
			<Route
				path="/results/:query"
				element={
					<PrivateRoute>
						<Search />
					</PrivateRoute>
				}
			/>
			<Route path="/user/:id/watchlist" element={<UserWatchlist />} />
			<Route path="/login" element={<Login />} />
			<Route path="/logout" element={<Logout />} />
		</Routes>
	);
}
