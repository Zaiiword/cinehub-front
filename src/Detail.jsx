import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';

export default function Detail() {
	const marecherche = useParams().id;
	const [serie, setSerie] = useState();
	useEffect(() => {
		setIsLoading(true);
		console.log('here');
		fetch(`https://api.tvmaze.com/shows/${marecherche}`)
			.then(response => response.json())
			.then(data => setSerie(data))
			.then(() => setIsLoading(false))
			.catch(err => console.log(err));
	}, []);
	return (
		<>
			<header>
				<Header />
			</header>
			<div class="pageContainer">
				<div class="pageContent">
					<article class="showDetail">
						<header class="banner">
							<img src="https://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg" />
							<h1>Rick and Morty</h1>
							<div class="summary">
								Rick is a mentally gifted, but sociopathic and alcoholic
								scientist and a grandfather to Morty; an awkward,
								impressionable, and somewhat spineless teenage boy. Rick moves
								into the family home of Morty, where he immediately becomes a
								bad influence.
							</div>
						</header>
						<section class="infos">
							<div>
								Note : <span class="rating">8.9</span>
							</div>
							Première diffusion : <time datetime="2013-12-02">02/12/2013</time>
							<div>
								Site officiel :{' '}
								<a href="http://www.adultswim.com/videos/rick-and-morty">
									http://www.adultswim.com/videos/rick-and-morty
								</a>
							</div>
						</section>
						<section class="episodes">Les 5 derniers épisodes :</section>
					</article>
				</div>
			</div>
		</>
	);
}
