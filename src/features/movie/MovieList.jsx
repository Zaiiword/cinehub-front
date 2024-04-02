import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTag from './MovieTag';

export default function MovieList() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:8080/movie/summary?limit=8')
			.then(response => response.json())
			.then(data => setMovies(data))
			.then(() => setIsLoading(false))
			.catch(error => console.error('Error:', error));
	}, []);

	return (
		<>
			<div className="pageContainer">
				<div className="pageContent">
					<div className={isLoading ? 'showList is-loading' : 'showList'}>
						{movies.map(movie => (
							<MovieTag movie={movie} key={movie.title} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
