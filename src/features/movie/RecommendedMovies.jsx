/**
 * Handles the click event on the movie tag.
 * It navigates to the movie's detail page.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieTag from './MovieTag';

/**
 * RecommendedMovies component.
 * This component is responsible for rendering a list of recommended movies for a user.
 * It fetches the recommended movies from the server and displays them using the MovieTag component.
 *
 * @function
 * @param {Object} props - The props object.
 * @param {string} props.userId - The ID of the user.
 * @returns {JSX.Element} The rendered component.
 */
export default function RecommendedMovies({ userId }) {
	/**
	 * State and setter for recommended movies.
	 * @type {Array}
	 */
	const [recommendedMovies, setRecommendedMovies] = useState([]);

	/**
	 * Fetches the recommended movies for the user when the component mounts or when the userId changes.
	 */
	useEffect(() => {
		axios
			.get(`http://backend.cinehub.ovh/movie/recommendations/${userId}`)
			.then(response => {
				setRecommendedMovies(response.data);
			})
			.catch(error => {
				console.error('Error fetching recommended movies', error);
			});
	}, [userId]);

	return (
		<div>
			<h2>Recommended Movies</h2>
			<div className="recommended-movies-list">
				{recommendedMovies.map(movie => (
					<MovieTag className="movie-tag" movie={movie} key={movie.id} />
				))}
			</div>
		</div>
	);
}
