import { useState, useEffect, useRef } from 'react';
import Serie from './Serie';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function Main() {
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
			<header>
				<Header />
			</header>
			<div className="pageContainer">
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{movies.map(movie => (
							<Serie serie={movie} key={movie.id} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
