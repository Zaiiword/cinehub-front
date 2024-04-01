import { Routes, Route } from 'react-router-dom';
import MovieList from '../features/movie/MovieList';
import Search from './Search';
import MovieDetail from '../features/movie/MovieDetail';

export default function Navigator() {
	return (
		<Routes>
			<Route path="/" element={<MovieList />} />
			<Route path="/results/:query" element={<Search />} />
			<Route path="/movie/:id" element={<MovieDetail />} />
		</Routes>
	);
}
