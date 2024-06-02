/**
 * @file
 * This file contains the MovieList component which is responsible for rendering a list of movies.
 */

import { useState, useEffect } from 'react';
import MovieTag from './MovieTag';
import axios from 'axios';
import RecommendedMovies from './RecommendedMovies';

/**
 * MovieList component.
 * This component is responsible for rendering a list of movies.
 * It fetches the movies and user data from the server and displays them.
 *
 * @function
 * @returns {JSX.Element} The rendered component.
 */
export default function MovieList() {
	/**
	 * State and setter for genres presents in the database.
	 * @type {Array}
	 */
	const [genres, setGenres] = useState([]);
	/**
	 * State and setter for all movies.
	 * @type {Array}
	 */
	const [allMovies, setAllMovies] = useState([]);
	/**
	 * State and setter for the movies displayed on the page.
	 * @type {Array}
	 */
	const [displayedMovies, setDisplayedMovies] = useState([]);
	/**
	 * State and setter for isLoading.
	 * @type {boolean}
	 */
	const [isLoading, setIsLoading] = useState(false);
	/**
	 * State and setter for the selected genre by the user.
	 * @type {Object}
	 */
	const [selectedGenre, setSelectedGenre] = useState(null);
	/**
	 * State and setter for showFilter.
	 * @type {boolean}
	 */
	const [showFilter, setShowFilter] = useState(false);
	/**
	 * The current page number for the movie list.
	 * @type {number}
	 */
	const [currentPage, setCurrentPage] = useState(1);
	/**
	 * The user data fetched from the server.
	 * @type {Object}
	 */
	const [user, setUser] = useState(null);

	/**
	 * The number of movies to display per page.
	 * @type {number}
	 */
	const moviesPerPage = 9;
	/**
	 * The total number of pages in the movie list.
	 * @type {number}
	 */
	const [totalPages, setTotalPages] = useState(0);

	/**
	 * Fetches the user data and all movies when the component mounts.
	 */
	useEffect(() => {
		setIsLoading(true);
		/**
		 * Fetches the user data from the server.
		 */
		const fetchUser = async () => {
			try {
				const response = await axios.get('http://localhost:8080/user/me');
				setUser(response.data);
				console.log(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		/**
		 * Fetches all movies from the server.
		 */
		const fetchAllMovies = async () => {
			try {
				const response = await axios.get('http://localhost:8080/movie');
				setAllMovies(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		/**
		 * Fetches all genres from the server.
		 */
		const fetchGenres = async () => {
			try {
				const response = await axios.get('http://localhost:8080/movie/genres');
				setGenres(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};

		/**
		 * Fetches user data, all movies, and all genres from the server.
		 * After fetching, it sets the loading state to false.
		 */
		const fetchData = async () => {
			await fetchUser();
			await fetchAllMovies();
			await fetchGenres();
			setIsLoading(false);
		};

		fetchData();
	}, []);

	/**
	 * This effect is responsible for setting the displayed movies based on the selected genre.
	 * If a genre is selected, it filters the movies by that genre and sets the displayed movies.
	 * If no genre is selected, it sets the displayed movies to the first page of all movies.
	 * It also sets the total pages and current page accordingly.
	 */
	useEffect(() => {
		setIsLoading(true);
		if (selectedGenre) {
			const filteredMovies = allMovies.filter(movie =>
				movie.genres.some(genre => genre.id === Number(selectedGenre))
			);
			setDisplayedMovies(filteredMovies.slice(0, moviesPerPage));
			setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
			setCurrentPage(1);
		} else {
			setDisplayedMovies(allMovies.slice(0, moviesPerPage));
			setTotalPages(Math.ceil(allMovies.length / moviesPerPage));
			setCurrentPage(1);
		}
		setIsLoading(false);
	}, [selectedGenre, allMovies]);

	/**
	 * This effect is responsible for setting the displayed movies based on the current page.
	 * It calculates the index of the first and last movie of the current page and slices the movies array accordingly.
	 * If a genre is selected, it filters the movies by that genre before slicing.
	 * It then sets the displayed movies and stops the loading state.
	 */
	useEffect(() => {
		setIsLoading(true);
		const indexOfLastMovie = currentPage * moviesPerPage;
		const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
		if (selectedGenre) {
			const currentMovies = allMovies
				.filter(movie =>
					movie.genres.some(genre => genre.id === Number(selectedGenre))
				)
				.slice(indexOfFirstMovie, indexOfLastMovie);
			setDisplayedMovies(currentMovies);
			setIsLoading(false);
			return;
		} else {
			const currentMovies = allMovies.slice(
				indexOfFirstMovie,
				indexOfLastMovie
			);
			setDisplayedMovies(currentMovies);
			setIsLoading(false);
		}
	}, [currentPage]);

	/**
	 * This function handles the change event of the genre checkboxes.
	 * It sets the selected genre to the value of the checkbox that triggered the event.
	 *
	 * @param {Event} event - The change event.
	 */
	function handleCheckboxChange(event) {
		const genreId = event.target.value;
		if (selectedGenre === genreId) {
			setSelectedGenre(null); // Deselect the checkbox if it's already selected
		} else {
			setSelectedGenre(String(genreId));
		}
	}

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
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
							<MovieTag className="movie-tag" movie={movie} key={movie.id} />
						))}
					</div>
					<div className="page-number">
						{pageNumbers.map(number => (
							<button key={number} onClick={() => setCurrentPage(number)}>
								{number}
							</button>
						))}
					</div>
					<div>{user && <RecommendedMovies userId={user.id} />}</div>
				</div>
			</div>
		</>
	);
}
