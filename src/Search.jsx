import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Serie from './Serie';
import Header from './Header';

export default function Search() {
	const marecherche = useParams().marecherche;
	const [isLoading, setIsLoading] = useState(false);
	const [series, setSeries] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		console.log('here');
		fetch(`https://api.tvmaze.com/search/shows?q=${marecherche}`)
			.then(response => response.json())
			.then(data => setSeries(data))
			.then(() => setIsLoading(false))
			.catch(err => console.log(err));
	}, [marecherche]);

	return (
		<>
			<header>
				<Header />
			</header>
			<div className="pageContainer home">
				<div className="pageTitle">
					<h1>Recherche : &quot;{marecherche} &quot;</h1>
				</div>
				<div className="pageContent">
					<section className={isLoading ? 'showList is-loading' : 'showList'}>
						{series?.map(movie => (
							<Serie serie={movie.show} key={movie.show.id} />
						))}
					</section>
				</div>
			</div>
		</>
	);
}
