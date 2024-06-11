/**
 * @file
 * This file contains the Search component which is responsible for rendering the search results.
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import MovieTag from '../features/movie/MovieTag';
import axios from 'axios';

/**
 * Search component.
 * This component is responsible for rendering the search results.
 * It fetches the movies that match the search query from the server and displays them.
 *
 * @function
 * @returns {JSX.Element} The rendered component.
 */
export default function Search() {
	const query = useParams().query;
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);

	/**
	 * This effect runs when the query changes.
	 * It fetches the movies that match the query from the server and updates the movies state.
	 */
	useEffect(() => {
		setIsLoading(true);
		console.log('here');
		axios
			.get(`http://backend.cinehub.ovh/movie/search?q=${query}`)
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
