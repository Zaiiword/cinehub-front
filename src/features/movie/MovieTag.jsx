import { useNavigate } from 'react-router-dom';

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
				{'★'.repeat(movie.rating) + '☆'.repeat(5 - movie.rating)}
			</div>
		</div>
	);
}
