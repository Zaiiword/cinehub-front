import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

export default function MovieTag(movie) {
	movie = movie.movie;
	const navigate = useNavigate();

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
