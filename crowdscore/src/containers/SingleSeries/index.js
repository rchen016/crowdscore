import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class SingleSeries extends Component{
	state = {
		show: null
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
			.then( (response) => response.json() )
			.then( json => this.setState( { show: json }));
	}

	render(){
		const { show } = this.state;

		return(
			<React.Fragment>
				{ show===null && <Loader />}
				<Container>
					<Row>
						<Col>
							{
								show!==null
								&&
								<Card className="sSeriesCard">
							    	<Card.Img variant="top" src={show.image.medium} />
							  		<Card.Body>
								    	<Card.Title className="text-center"> {show.name} </Card.Title>
								    	<Card.Text>
								      		Rating - {show.rating.average}
								    	</Card.Text>
										<Card.Text>
									  		Episodes - {show._embedded.episodes.length}
								    	</Card.Text>
								    	<Button variant="primary">Go somewhere</Button>
							  		</Card.Body>
								</Card>
							}
						</Col>
					</Row>
				</Container>

			</React.Fragment>

		)
	}
}

export default SingleSeries;
