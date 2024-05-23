import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieTag from './MovieTag';

export default function RecommendedMovies({ userId }) {
	const [recommendedMovies, setRecommendedMovies] = useState([]);

	useEffect(() => {
		axios
			.get(
				`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/recommendations/${userId}`
			)
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
