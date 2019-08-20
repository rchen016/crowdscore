import React from 'react';
import { Card } from 'react-bootstrap';
import defaultLogo from '../../assets/default.jpg';

const EpisodeCard = props => {
	let epiInfo = (props.tvmaze || []).id;
	console.log("id: "+epiInfo);

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
				props.tvmaze.name
			}
			<br />
			{
				props.tvmaze.number!==null
				&&
				`Episode: ${props.tvmaze.number}`
			}
			<br />
			{
				props.tvmaze.airdate!==null
				&&
				`Airdate: ${props.tvmaze.airdate}`
			}
			<br />
			{
				props.tvmaze.summary!==null
				&&
				props.tvmaze.summary.substring(3,props.tvmaze.summary.length-4)
			}
			</Card.Body>
		</Card>
	)
}

export default EpisodeCard;
