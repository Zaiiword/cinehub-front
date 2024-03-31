export default function Serie(serie) {
	const episode = serie.serie;
	return (
		<a href={`/series/${episode.id}`} className="showThumbnail">
			<header>
				<img src={episode?.image?.original} className="thumbnail" />
				<div className="summary">{episode.summary}</div>
			</header>
			<section className="infos">
				<h3>
					{episode.name}{' '}
					<span className="rating">{episode?.rating?.average}</span>
				</h3>
				<time dateTime="2014-09-25">{episode.premiered}</time>
			</section>
		</a>
	);
}
