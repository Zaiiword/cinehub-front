import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

export default function MovieDetail() {
	const movieId = useParams().id;
	const commentRef = useRef();

	const [movie, setMovie] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		fetchMovie();
		fetchUser();
	}, []);

	function fetchMovie() {
		axios
			.get(
				`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/${movieId}`
			)
			.then(data => {
				setMovie(data.data);
			})
			.then(() => setIsLoading(false));
	}

	function fetchUser() {
		//get the user
		axios
			.get('http://cinehub-back.us-east-1.elasticbeanstalk.com/user/me')
			.then(response => {
				setUser(response.data);
			});
	}

	function handleCommentSubmit() {
		event.preventDefault();
		const review = {
			userId: user.id,
			rating: rating,
			comment: commentRef.current.value,
		};
		axios
			.post(
				`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/${movieId}/review`,
				review,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(() => {
				commentRef.current.value = '';
				setRating(0);
				fetchMovie();
			}); //to update the page with the new comment
	}

	const changeRating = newRating => {
		setRating(newRating);
	};

	const handleLike = async reviewId => {
		await axios.patch(
			`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/review/${reviewId}`,
			user,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		fetchMovie();
	};

	const handleWatchList = async () => {
		await axios.post(
			`http://cinehub-back.us-east-1.elasticbeanstalk.com/user/watchlist/${movieId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		fetchUser();
	};

	function deleteReview(id) {
		axios
			.delete(
				`http://cinehub-back.us-east-1.elasticbeanstalk.com/movie/review/${id}`
			)
			.then(() => {
				fetchMovie();
			});
	}

	const isMovieInWatchlist = user?.watchlist.some(
		watchlistMovie => watchlistMovie?.id === movie?.id
	);

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
							<button className="watchListButton " onClick={handleWatchList}>
								<i
									className={
										isMovieInWatchlist
											? 'fa-solid fa-clock'
											: 'fa-regular fa-clock'
									}
								></i>
							</button>
						</div>
						<div className="imageDetails">
							<img src={movie?.poster} />
							<div className="ratingStars">
								<ReactStars
									count={5}
									value={movie?.rating}
									size={40}
									isHalf={true}
									emptyIcon={<i className="far fa-star"></i>}
									halfIcon={<i className="fa fa-star-half-alt"></i>}
									fullIcon={<i className="fa fa-star"></i>}
									activeColor="gold"
									edit={false}
								/>
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
								ref={commentRef}
								onChange={e => setComment(e.target.value)}
							></textarea>
							<button
								className="commentButton"
								onClick={handleCommentSubmit}
								disabled={rating === 0 || comment === ''}
							>
								<i className="fa-regular fa-paper-plane"></i>
							</button>
						</form>
						<div className="commentRating">
							<ReactStars
								count={5}
								onChange={changeRating}
								size={24}
								isHalf={true}
								emptyIcon={<i className="far fa-star"></i>}
								halfIcon={<i className="fa fa-star-half-alt"></i>}
								fullIcon={<i className="fa fa-star"></i>}
								activeColor="gold"
							/>
						</div>

						<section className="commentList">
							{movie?.reviews.map((review, index) => {
								const isLikedByUser = review.likedBy.some(
									like => like.id === user.id
								);
								return (
									<div key={index} className="commentItem">
										<div className="commentInformations">
											<p className="commentText">{review.content}</p>
											<ReactStars
												count={5}
												value={review.rating}
												size={20}
												isHalf={true}
												emptyIcon={<i className="far fa-star"></i>}
												halfIcon={<i className="fa fa-star-half-alt"></i>}
												fullIcon={<i className="fa fa-star"></i>}
												activeColor="gold"
												edit={false}
											/>
											<p className="commentUser">
												{review.user.firstName} {review.user.name}
											</p>
										</div>
										<div className="commentItemButtons">
											<p className="likeCount">{review.likedBy.length}</p>
											<button
												className="likesButtons likeButton"
												onClick={() => handleLike(review.id)}
											>
												<i
													className={
														isLikedByUser
															? 'fa-solid fa-heart'
															: 'fa-regular fa-heart'
													}
												></i>
											</button>
											{user?.role === 'admin' && (
												<button
													className="deleteButton"
													onClick={() => deleteReview(review.id)}
												>
													Delete
												</button>
											)}
										</div>
									</div>
								);
							})}
						</section>
					</section>
				</div>
			)}
		</div>
	);
}
