import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import MovieTag from '../features/movie/MovieTag';

export default function Search() {
	const query = useParams().query;
	const [isLoading, setIsLoading] = useState(false);
	const [series, setSeries] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		console.log('here');
		fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
			.then(response => response.json())
			.then(data => setSeries(data))
			.then(() => setIsLoading(false))
			.catch(err => console.log(err));
	}, [query]);

	return (
		<>
			<div className="pageContainer home">
				<div className="pageTitle">
					<h1>Recherche : &quot;{query} &quot;</h1>
				</div>
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{series?.map(movie => (
							<MovieTag serie={movie.show} key={movie.show.id} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
