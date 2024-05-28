/**
 * @file
 * This file contains the MovieTag component which is responsible for rendering a single movie tag.
 */

import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

/**
 * MovieTag component.
 * This component is responsible for rendering a single movie tag.
 * It displays the movie's poster, name, and rating.
 * When clicked, it navigates to the movie's detail page.
 *
 * @function
 * @param {Object} props - The props object.
 * @param {Object} props.movie - The movie object.
 * @returns {JSX.Element} The rendered component.
 */
export default function MovieTag(movie) {
	movie = movie.movie;
	const navigate = useNavigate();

	/**
	 * Handles the click event on the movie tag.
	 * It navigates to the movie's detail page.
	 */
	const handleClick = () => {
		navigate(`/movie/${movie.id}`);
	};

	return (
		<div className="movie" onClick={handleClick}>
			<img src={movie.poster} alt={movie.name} />
			<div className="movie-title">{movie.name}</div>
			<div className="star-rating">
				<div className="star-rating">
					<ReactStars
						count={5}
						value={movie?.rating}
						isHalf={true}
						emptyIcon={<i className="far fa-star"></i>}
						halfIcon={<i className="fa fa-star-half-alt"></i>}
						fullIcon={<i className="fa fa-star"></i>}
						edit={false}
					/>
				</div>
			</div>
		</div>
	);
}
