import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTag from './MovieTag';

export default function MovieList() {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		fetch(`https://api.tvmaze.com/shows`)
			.then(response => response.json())
			.then(data => setMovies(data.slice(0, 12)))
			.then(() => setIsLoading(false))
			.then(console.log(movies));
	}, []);

	return (
		<>
			<div className="pageContainer">
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{movies.map(movie => (
							<MovieTag serie={movie} key={movie.id} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
