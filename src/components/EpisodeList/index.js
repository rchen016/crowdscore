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
				<li key={obj[prop].id}>
					{
						obj[prop].name.length > 25
						&&
						obj[prop].name.substring(0,25) + "..."
					}
					{
						obj[prop].name.length < 25
						&&
						obj[prop].name
					}

					<Link className="epiListLinksItem" key={obj[prop].id} to={`/episode/${obj[prop].id}`}><Button size="sm" variant="outline-dark">View</Button></Link>

				</li>
			);
		}
	}
}

const EpisodeList = (props) => {
	let epiList = ((props.tvmaze || [])._embedded || []);
	let epiListNames = [];
	console.log("List");
	console.log(epiList);
	getEpisodeNames(epiList,epiListNames);

	return(
		<Accordion className="accordStyle">
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
					Sources
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						API Source: <br />
						https://www.tvmaze.com/
						http://www.omdbapi.com/
						https://www.themoviedb.org/
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}
export default EpisodeList;
