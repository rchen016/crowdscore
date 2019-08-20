import React from 'react';
import "./index.css";
import { Accordion, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function getEpisodeNames( mainList, store ){
	for (var key in mainList){
		if(!mainList.hasOwnProperty(key)) continue;
		var obj = mainList[key];
		for (var prop in obj){
			if(!obj.hasOwnProperty(prop)) continue;
			store.push(
				<Link key={obj[prop].id} to={`/episode/${obj[prop].id}`}>
					<li>{obj[prop].name}</li>
				</Link>
			);
		}
	}
}

const EpisodeList = (props) => {
	let epiList = ((props.tvmaze || [])._embedded || []);
	let epiListNames = [];
	getEpisodeNames(epiList,epiListNames);

	return(
		<Accordion>
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="0">
					Episode List
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Card.Body>{epiListNames}</Card.Body>
				</Accordion.Collapse>
				</Card>
				<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="1">
					Click me!
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>Hello! I'm another body</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}
export default EpisodeList;
