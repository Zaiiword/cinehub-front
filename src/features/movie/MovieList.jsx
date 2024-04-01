import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTag from './MovieTag';

export default function MovieList() {
	const films = [
		{
			title: 'Dune',
			rating: 5,
			image: 'https://theposterdb.com/api/assets/356989',
		},
		{
			title: 'Dune: Part Two',
			rating: 3,
			image: 'https://theposterdb.com/api/assets/356990',
		},
		{
			title: 'Oppenheimer',
			rating: 4,
			image: 'https://theposterdb.com/api/assets/389038',
		},
		{
			title: 'The Batman',
			rating: 3,
			image: 'https://theposterdb.com/api/assets/228876',
		},
		{
			title: 'Joker',
			rating: 5,
			image: 'https://theposterdb.com/api/assets/14070',
		},
		{
			title: 'Interstellar',
			rating: 4,
			image: 'https://theposterdb.com/api/assets/102665',
		},
	];
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		// setIsLoading(true);
		// fetch(`https://api.tvmaze.com/shows`)
		// 	.then(response => response.json())
		// 	.then(data => setMovies(data.slice(0, 12)))
		// 	.then(() => setIsLoading(false))
		// 	.then(console.log(movies));

		setMovies(films);
	}, []);
	console.log(movies);

	return (
		<>
			<div className="pageContainer">
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{movies.map(movie => (
							<MovieTag movie={movie} key={movie.title} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
