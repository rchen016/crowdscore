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
	//Extract the Movie Names only
	for(var key in props.list.results){
		if(!props.list.results.hasOwnProperty(key)) continue;
		var obj = props.list.results[key];
		store.push(
			<Link to={`/movie/${obj.id}`}>
				{obj.original_title}
			</Link>
		);
	}
}

const ContentList = (props) => {

	var isMovieMode = props.isMovie;

	if(isMovieMode){
		console.log("IT's a Movie SeriesList");
		var movieList = [];
		extractMovieNames(props,movieList);
		return(
			<div>
				<ul className="contentList">
					{ movieList.map(data=>(
						<li key={data}>
							{data}
						</li>
					))}
				</ul>
			</div>
		)
	}
	else{
		return(
			<div>
				<ul className="contentList">
					{ props.list.map(series => (
						<SeriesListItem key={series.show.id } series={series}/>
					))}
				</ul>
			</div>
		)
	}
}

export default ContentList;
