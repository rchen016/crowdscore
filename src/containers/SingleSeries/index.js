import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class SingleSeries extends Component{
	state = {
		show: null,
		imdbRating: null
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
			.then( (response) => response.json() )
			.then(
					json => {
					this.setState( { show: json });
					fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.show.name}`)
					.then((response) => response.json())
					.then(
						json =>{
							console.log(json.imdbRating);
							this.setState( { imdbRating: json.imdbRating });
						}
					);

				})
	}

	render(){
		const { show } = this.state;
		const { imdbRating } = this.state;

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
										<Card.Text>
									  		IMDB - {imdbRating}
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
