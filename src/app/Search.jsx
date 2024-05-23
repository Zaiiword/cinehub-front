import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import MovieTag from '../features/movie/MovieTag';
import axios from 'axios';

export default function Search() {
	const query = useParams().query;
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		console.log('here');
		axios
			.get(
				`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/search?q=${query}`
			)
			.then(response => setMovies(response.data))
			.then(() => setIsLoading(false))
			.catch(err => console.log(err));
	}, [query]);

	return (
		<>
			<div className="pageContainer home">
				<div className="pageTitle">
					<h2>Movies for &quot;{query}&quot; :</h2>
				</div>
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{console.log(movies)}
						{movies.map(movie => (
							<MovieTag movie={movie} key={movie.id} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
