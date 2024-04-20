import { Routes, Route } from 'react-router-dom';
import MovieList from '../features/movie/MovieList';
import Search from './Search';
import MovieDetail from '../features/movie/MovieDetail';
import Login from './Login';
import PrivateRoute from '../features/PrivateRoute';

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
				path="/results/:query"
				element={
					<PrivateRoute>
						<Search />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
