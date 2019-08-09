import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class SingleSeries extends Component{
	state = {
		tvmaze: null,
		omdb: null
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
			.then( (response) => response.json() )
			.then(
					json => {
						console.log(json);
					this.setState( { tvmaze: json });
					fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.tvmaze.name}`)
					.then((response) => response.json())
					.then(
						json =>{
							console.log(json);
							this.setState( { omdb: json });
						}
					);

				})
	}

	render(){
		const { tvmaze } = this.state;
		const { omdb } = this.state;
		return(
			<React.Fragment>
				{ tvmaze===null && omdb===null && <Loader /> }
				<Container>
					<Row>
						<Col>
							{
								tvmaze!==null && omdb!==null
								&&
								<Card className="sSeriesCard">
							    	<Card.Img variant="top" src={tvmaze.image.original} />
							  		<Card.Body>
								    	<Card.Title className="text-center"> {tvmaze.name} </Card.Title>
										<Card.Title className="text-center"> {tvmaze.network.name} {tvmaze.webChannel.name}</Card.Title>
										<Card.Title className="text-center"> {tvmaze.premiered} </Card.Title>
										<Card.Title className="text-center"> S:{omdb.totalSeasons}E:{tvmaze._embedded.episodes.length} </Card.Title>
										<Card.Title className="text-center"> {omdb.rated} </Card.Title>
										<Card.Title className="text-center"> {tvmaze.genres} </Card.Title>

								    	<Card.Text>
								      		TV Maze Rating - {tvmaze.rating.average}
								    	</Card.Text>
										<Card.Text>
											IMDB - {omdb.imdbRating} ({omdb.imdbVotes})
								    	</Card.Text>
										<Card.Text>
									  		Episodes - {tvmaze._embedded.episodes.length}
								    	</Card.Text>
										<Card.Text>
											{omdb.Plot}
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
