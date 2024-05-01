import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieTag from '../movie/MovieTag';
import { useParams } from 'react-router-dom';

export function UserWatchlist() {
	const publicUserId = useParams().id;

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:8080/user/me')
			.then(response => {
				setUser(response.data);
				console.log(response.data);
			})
			.then(() => setIsLoading(false))

			.catch(err => console.log(err));
	}, []);

	function fetchUser() {
		//get the user
		axios.get('http://localhost:8080/user/me').then(response => {
			setUser(response.data);
		});
	}

	function removeMovie(movieId) {
		axios
			.delete(`http://localhost:8080/user/watchlist/${movieId}`)
			.then(() => {
				fetchUser();
			})
			.catch(err => console.log(err));
	}

	return (
		<>
			<div className="pageContainer home">
				<div className="pageTitle">
					<h2></h2>
				</div>
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{console.log(user)}
						{user?.watchlist.map(movie => (
							<div>
								<MovieTag movie={movie} key={movie.id} />
								<button onClick={() => removeMovie(movie.id)}>Remove</button>
							</div>
						))}
					</section>
				</div>
			</div>
		</>
	);
}
