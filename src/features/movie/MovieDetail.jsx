import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieDetail() {
	const movieId = useParams().id;
	const [movie, setMovie] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log(isLoading);
		setIsLoading(true);
		fetch(`http://localhost:8080/movie/${movieId}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setMovie(data);
			})
			.then(console.log(movie))
			.then(() => setIsLoading(false))
			.then(() => console.log(isLoading));
	}, []);
	return (
		<div className="pageContainer">
			{isLoading ? (
				<div className="is-loading"></div>
			) : (
				<div className="pageContent">
					<div className="firstDetails">
						<div className="textDetails">
							<h1 className="title">{movie?.name}</h1>
							<p className="infoDetail">
								<span className="category">RELEASE DATE :</span>
								<span>
									{movie?.released &&
										new Date(movie.released).toLocaleDateString('en-US')}
								</span>
							</p>
							<p className="infoDetail">
								<span className="category">DIRECTED BY :</span>
								<span>{movie?.directors}</span>
							</p>
							<p className="infoDetail">
								<span className="category">CAST :</span>
								<span>{movie?.actors}</span>
							</p>
							<p className="infoDetail">
								<span className="category">DURATION : </span>
								<span>{movie?.duration}</span>
							</p>
						</div>
						<div className="imageDetails">
							<img src={movie?.poster} />
							<div className="ratingStars">
								{'★'.repeat(movie?.rating) + '☆'.repeat(5 - movie?.rating)}
							</div>
						</div>
					</div>

					<div className="synopsisDetail">
						<h3>Synopsis :</h3>
						<p>{movie?.synopsis}</p>
					</div>
					<section className="trailerDetail">
						<iframe
							width="560"
							height="315"
							src={movie?.trailer}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</section>
					<section className="commentDetail">
						<form className="commentForm">
							<textarea
								className="commentTextArea"
								placeholder="Add a comment..."
							></textarea>
							<button className="commentButton">
								<i className="fa-regular fa-paper-plane"></i>
							</button>
						</form>
						<section className="commentList">
							{Array.from({ length: 10 }).map((_, index) => (
								<div key={index} className="commentItem">
									<p className="commentText">Comment {index + 1}</p>
								</div>
							))}
						</section>
					</section>
				</div>
			)}
		</div>
	);
}
