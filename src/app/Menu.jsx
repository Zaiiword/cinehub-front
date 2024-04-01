import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
	const navigate = useNavigate();
	const search = useRef(null);

	function handleSubmit(event) {
		event.preventDefault();
		navigate(`/resultats/${search.current.value}`);
	}
	return (
		<header>
			<nav>
				<h1 className="logo">
					<a href="/">
						React<em>FLIX</em>
					</a>
				</h1>
			</nav>
			<section className="searchForm">
				<form onSubmit={handleSubmit}>
					<input name="search" ref={search} />
					<button>chercher</button>
				</form>
			</section>
		</header>
	);
}
