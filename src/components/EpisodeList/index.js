import React from 'react';
import "./index.css";
import { Accordion, Card, Button } from 'react-bootstrap'

function getEpisodeNames( mainList, store ){
	for (var key in mainList){
		if(!mainList.hasOwnProperty(key)) continue;
		var obj = mainList[key];
		for (var prop in obj){
			if(!obj.hasOwnProperty(prop)) continue;
			store.push(<li key={prop}>{obj[prop].name}</li>);
		}
	}
}

const EpisodeList = (props) => {
	let epiList = ((props.blah || [])._embedded || []);
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
					<Card.Body>{epiListNames}<br/></Card.Body>
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
