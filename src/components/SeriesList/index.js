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

function extractMovieNames(props,store){
	for(var key in props.list.results){
		if(!props.list.results.hasOwnProperty(key)) continue;
		var obj = props.list.results[key];
		store.push(
			obj.original_name
		);
	}
}

const SeriesList = (props) => {

	var isMovieMode = props.isMovie;

	if(isMovieMode){
		var movieList = [];
		extractMovieNames(props,movieList);
		return(
			<div>
				<ul>
					{movieList}
				</ul>
			</div>
		)
	}
	else{
		return(
			<div>
				<ul className="seriesList">
					{ props.list.map(series => (
						<SeriesListItem key={series.show.id } series={series}/>
					))}
				</ul>
			</div>
		)
	}
}

export default SeriesList;
