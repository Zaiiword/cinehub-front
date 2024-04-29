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

	function fetchMovie() {
		axios
			.get(`http://localhost:8080/movie/${movieId}`)
			.then(data => {
				setMovie(data.data);
			})
			.then(() => setIsLoading(false));
	}

	useEffect(() => {
		setIsLoading(true);
		fetchMovie();

		//get the user
		axios.get('http://localhost:8080/user/me').then(response => {
			setUser(response.data);
		});
	}, []);

	function handleCommentSubmit() {
		event.preventDefault();
		const review = {
			userId: '1', //TODO find from the token the user id in the back
			rating: rating,
			comment: commentRef.current.value,
		};
		axios
			.post(`http://localhost:8080/movie/${movieId}/review`, review, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				commentRef.current.value = '';
				setRating(0);
				fetchMovie();
				console.log(movie.rating);
			}); //to update the page with the new comment
	}

	const changeRating = newRating => {
		setRating(newRating);
	};

	const handleLike = async reviewId => {
		console.log(user);
		await axios.patch(
			`http://localhost:8080/movie/${movie.id}/review/${reviewId}`,
			{ user },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		fetchMovie();
	};

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
							{movie?.reviews.map((review, index) => (
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
											<i className="fa-regular fa-heart"></i>
										</button>
									</div>
								</div>
							))}
						</section>
					</section>
				</div>
			)}
		</div>
	);
}
