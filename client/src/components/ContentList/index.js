import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';

const SeriesListItem = ({series}) => (
	<li>
		<Link to={`/series/${series.show.id}`}>
			{ series.show.name }
		</Link>
	</li>
)

const MovieListItem = ({movie}) => (
	<li>
		<Link to={`/movie/${movie.id}`}>
			{ movie.original_title }
		</Link>
	</li>
)

const ContentList = (props) => {

	var isMovieMode = props.isMovie;
	if(props.list!==""){
		return(
			isMovieMode ? (
				<ul className="contentList">
					{ props.list.map(movie => (
						<MovieListItem key={movie.id} movie={movie}/>
					))}
				</ul>
			) : (
					<ul className="contentList">
						{ props.list.map(series => (
							<SeriesListItem key={series.show.id } series={series}/>
						))}
					</ul>
			)
		)
	}
	else{
		return(
			<></>
		)
	}
}

export default ContentList;
