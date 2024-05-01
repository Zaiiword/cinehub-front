import { useState, useEffect } from 'react';
import MovieTag from './MovieTag';
import axios from 'axios';

export default function MovieList() {
	const [genres, setGenres] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [displayedMovies, setDisplayedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState(null);

	useEffect(() => {
		fetchGenres();
		fetchAllMovies();
	}, []);

	useEffect(() => {
		if (selectedGenre) {
			const filteredMovies = allMovies.filter(movie =>
				movie.genres.some(genre => genre.id === Number(selectedGenre))
			);
			setDisplayedMovies(filteredMovies);
		} else {
			setDisplayedMovies(allMovies);
		}
	}, [selectedGenre, allMovies]);

	function fetchGenres() {
		axios.get('http://localhost:8080/movie/genres').then(response => {
			setGenres(response.data);
		});
	}

	function fetchAllMovies() {
		setIsLoading(true);
		axios
			.get('http://localhost:8080/movie/summary?limit=8')
			.then(response => {
				setAllMovies(response.data);
				setDisplayedMovies(response.data);
			})
			.catch(error => console.error('Error:', error))
			.finally(() => setIsLoading(false));
	}

	function handleCheckboxChange(event) {
		const genreId = event.target.value;
		if (selectedGenre === genreId) {
			setSelectedGenre(null); // Deselect the checkbox if it's already selected
		} else {
			setSelectedGenre(String(genreId));
		}
	}

	return (
		<>
			<div className="pageContainer">
				<div className="pageContent">
					{genres.map(genre => (
						<div key={genre.id}>
							<label>
								<input
									type="checkbox"
									value={genre.id}
									checked={Number(selectedGenre) === genre.id}
									onChange={handleCheckboxChange}
								/>
								{genre.name}
							</label>
						</div>
					))}
					<div className={isLoading ? 'showList is-loading' : 'showList'}>
						{displayedMovies.map(movie => (
							<MovieTag movie={movie} key={movie.id} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
