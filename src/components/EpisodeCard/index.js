import React from 'react';
import { Card } from 'react-bootstrap';
import defaultLogo from '../../assets/default.jpg';

const EpisodeCard = props => {
	let epiInfo = (props.tvmaze || []).id;
	console.log("id: "+epiInfo);
	let summaryStyle={
		backgroundColor: "#EDEDED",
		marginTop: '10px'
	};

	return(

		<Card>
			{
				props.tvmaze.image!==null
				&&
				<Card.Img className="text-center" variant="top" src={props.tvmaze.image.original} />
			}
			{
				props.tvmaze.image===null
				&&
				<Card.Img variant="top" src={defaultLogo} />
			}
			<Card.Body>
			{
				props.tvmaze.name!==null
				&&
				<div className="text-center titleFont"><strong>{props.tvmaze.name}</strong></div>
			}
			<br />
			{
				props.tvmaze.number!==null
				&&
				<span><strong>Episode: {props.tvmaze.number}</strong></span>
			}
			<br />
			{
				props.tvmaze.airdate!==null
				&&
				<span>Airdate: {props.tvmaze.airdate}</span>
			}
			<br />
			{
				props.tvmaze.summary!==null
				&&
				<div style={summaryStyle}>{props.tvmaze.summary.replace(/<p>/g,'').replace(/<\/p>/g,'')}</div>

			}
			</Card.Body>
		</Card>
	)
}

export default EpisodeCard;
