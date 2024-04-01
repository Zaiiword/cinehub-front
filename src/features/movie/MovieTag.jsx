export default function MovieTag(movie) {
	movie = movie.movie;
	return (
		<div className="movie">
			<img src={movie.image} alt={movie.title} />
			<div className="movie-title">{movie.title}</div>
			<div className="star-rating">
				{'★'.repeat(movie.rating) + '☆'.repeat(5 - movie.rating)}
			</div>
		</div>
	);
}
