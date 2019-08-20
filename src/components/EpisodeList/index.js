import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap'

function getEpisodeNames( mainList, store ){
	for (var key in mainList){
		if(!mainList.hasOwnProperty(key)) continue;
		var obj = mainList[key];
		for (var prop in obj){
			if(!obj.hasOwnProperty(prop)) continue;
			store.push(obj[prop].name);
		}
	}
}

const EpisodeList = (props) => {
	let epiList = ((props.blah || [])._embedded || []);
	let epiListNames = [];
	getEpisodeNames(epiList,epiListNames);
	
	return(
		<Accordion defaultActiveKey="0">
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey="1">
					Episode List
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
				<Card.Body>{epiListNames}</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}

export default EpisodeList;
