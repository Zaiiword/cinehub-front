/**
 * @file
 * This file contains the UserWatchlist component which is responsible for rendering a user's watchlist.
 */
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieTag from '../movie/MovieTag';
import { useParams } from 'react-router-dom';

/**
 * UserWatchlist component.
 * This component fetches and displays the movies in the user's watchlist.
 * It also provides functionality to remove a movie from the watchlist.
 *
 * @returns {JSX.Element} The rendered UserWatchlist component.
 */
export function UserWatchlist() {
	/**
	 * The public user ID retrieved from the URL parameters.
	 * @type {string}
	 */
	const publicUserId = useParams().id;

	/**
	 * State and setter for the user data.
	 * @type {Object}
	 */
	const [user, setUser] = useState(null);
	/**
	 * State and setter for the loading state.
	 * @type {boolean}
	 */
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Fetch the user's data when the component mounts.
	 */
	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://backend.cinehub.ovh/user/me')
			.then(response => {
				setUser(response.data);
				console.log(response.data);
			})
			.then(() => setIsLoading(false))

			.catch(err => console.log(err));
	}, []);

	/**
	 * Fetch the user's data from the server.
	 */
	function fetchUser() {
		axios.get('http://backend.cinehub.ovh/user/me').then(response => {
			setUser(response.data);
		});
	}

	/**
	 * Remove a movie from the user's watchlist.
	 *
	 * @param {string} movieId - The ID of the movie to remove.
	 */
	function removeMovie(movieId) {
		axios
			.delete(`http://backend.cinehub.ovh/user/watchlist/${movieId}`)
			.then(() => {
				fetchUser();
			})
			.catch(err => console.log(err));
	}

	return (
		<>
			<div className="pageContainer home">
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{console.log(user)}
						{user?.watchlist.length === 0 ? (
							<div>
								<h1>No movies in watchlist</h1>
							</div>
						) : (
							user?.watchlist.map(movie => (
								<div className="watchlist-item" key={movie.id}>
									<MovieTag className="user-watchlist-movietag" movie={movie} />
									<button onClick={() => removeMovie(movie.id)}>Remove</button>
								</div>
							))
						)}
					</section>
				</div>
			</div>
		</>
	);
}
