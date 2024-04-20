import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail() {
	const movieId = useParams().id;
	const [movie, setMovie] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [ratingStars, setRatingStars] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`http://localhost:8080/movie/${movieId}`)
			.then(data => {
				console.log(data);
				setMovie(data.data);
			})
			.then(console.log(movie))
			.then(() => setIsLoading(false));
	}, []);

	function handleCommentSubmit() {
		event.preventDefault();
		let selectedRate = document.querySelector(
			'input[name="rating"]:checked'
		).value;
		setRatingStars(selectedRate);
	}
	useEffect(() => {
		console.log(ratingStars);
	}, [ratingStars]);
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
							<button className="commentButton" onClick={handleCommentSubmit}>
								<i className="fa-regular fa-paper-plane"></i>
							</button>
						</form>
						<div className="commentRating">
							<fieldset class="rating">
								<input type="radio" id="star5" name="rating" value="5" />
								<label
									class="full"
									for="star5"
									title="Perfect - 5 stars"
								></label>
								<input type="radio" id="star4half" name="rating" value="4.5" />
								<label
									class="half"
									for="star4half"
									title="Awesome - 4.5 stars"
								></label>
								<input type="radio" id="star4" name="rating" value="4" />
								<label
									class="full"
									for="star4"
									title="Very good - 4 stars"
								></label>
								<input type="radio" id="star3half" name="rating" value="3.5" />
								<label
									class="half"
									for="star3half"
									title="Good - 3.5 stars"
								></label>
								<input type="radio" id="star3" name="rating" value="3" />
								<label class="full" for="star3" title="Good - 3 stars"></label>
								<input type="radio" id="star2half" name="rating" value="2.5" />
								<label
									class="half"
									for="star2half"
									title="Mid - 2.5 stars"
								></label>
								<input type="radio" id="star2" name="rating" value="2" />
								<label class="full" for="star2" title="Meh - 2 stars"></label>
								<input type="radio" id="star1half" name="rating" value="1.5" />
								<label
									class="half"
									for="star1half"
									title="Bad - 1.5 stars"
								></label>
								<input type="radio" id="star1" name="rating" value="1" />
								<label
									class="full"
									for="star1"
									title="Very bad - 1 star"
								></label>
								<input type="radio" id="starhalf" name="rating" value="0.5" />
								<label
									class="half"
									for="starhalf"
									title="Awful - 0.5 stars"
								></label>
							</fieldset>
						</div>

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
