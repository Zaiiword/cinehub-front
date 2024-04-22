import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTag from './MovieTag';
import axios from 'axios';

export default function MovieList() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:8080/movie/summary?limit=8')
			.then(response => setMovies(response.data)) // Note: Axios encapsule la réponse dans un objet `data`
			.catch(error => console.error('Error:', error))
			.finally(() => setIsLoading(false)); // Gérer le cas où le chargement est terminé dans finally
	}, []);

	return (
		<>
			<div className="pageContainer">
				<div className="pageContent">
					<div className={isLoading ? 'showList is-loading' : 'showList'}>
						{movies.map(movie => (
							<MovieTag movie={movie} key={movie.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
