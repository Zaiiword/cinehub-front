import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieDetail() {
	const movieId = useParams().id;
	const [movie, setMovie] = useState();
	useEffect(() => {
		//setIsLoading(true);
		fetch(`http://localhost:8080/movie/${movieId}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setMovie(data);
			})
			.then(console.log(movie));
		//.then(() => setIsLoading(false))
	}, []);
	return (
		<div className="pageContainer">
			<div className="pageContent">
				<div className="firstDetails">
					<div className="textDetails">
						<h1 className="title">{movie?.name}</h1>
						<p className="infoDetail">
							<span>RELEASE DATE :</span>
							<span>
								{movie?.released &&
									new Date(movie.released).toLocaleDateString('en-US')}
							</span>
						</p>
						<p className="infoDetail">
							<span>DIRECTED BY :</span>
							<span>{movie?.directors}</span>
						</p>
						<p className="infoDetail">
							<span>CAST :</span>
							<span>{movie?.actors}</span>
						</p>
						<p className="infoDetail">
							<span>DURATION : </span>
							<span>{movie?.duration}</span>
						</p>
					</div>
					<div className="imageDetails">
						<img src="https://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg" />
						<div className="ratingStars">
							{'★'.repeat(movie?.rating) + '☆'.repeat(5 - movie?.rating)}
						</div>
					</div>
				</div>
				<div className="synopsisDetail">
					<p>{movie?.synopsis}</p>
				</div>
				<section className="trailerDetail">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/n9xhJrPXop4?si=-_UikpPY2KNkMsjz"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</section>
				<section className="commentForm">
					<form>
						<textarea placeholder="Comment"></textarea>
						<button>Envoyer</button>
					</form>
				</section>
				<section className="comments"></section>
			</div>
		</div>
	);
}
