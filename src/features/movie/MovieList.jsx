import { useState, useEffect } from 'react';
import MovieTag from './MovieTag';
import axios from 'axios';

export default function MovieList() {
	const [genres, setGenres] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [displayedMovies, setDisplayedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [showFilter, setShowFilter] = useState(false);

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
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							onClick={() => setShowFilter(!showFilter)}
							width="30"
							height="30"
							style={{ cursor: 'pointer' }}
						>
							<path
								fill="#001c40"
								d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
							/>
						</svg>
						<span
							onClick={() => setShowFilter(!showFilter)}
							style={{ fontFamily: 'Verdana', cursor: 'pointer' }}
						>
							Filter
						</span>

						{showFilter && (
							<div className="filter-container">
								{genres.map(genre => (
									<div className="filter-item" key={genre.id}>
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
							</div>
						)}
					</div>

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
