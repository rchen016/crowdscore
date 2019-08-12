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
								tvmaze!==null
								&&
								omdb!==null
								&&
								<Card className="sSeriesCard">
									{
										tvmaze.image!==null
										&&
										<Card.Img variant="top" src={tvmaze.image.original} />
									}
									{
										tvmaze.image===null
										&&
										<Card.Img variant="top" src="http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg" />
									}

							  		<Card.Body>
										{
											tvmaze.name!==null
											&&
											<Card.Title className="text-center"> {tvmaze.name} </Card.Title>
										}
										{
											tvmaze.name===null
											&&
											<Card.Title className="text-center"> No Title Found </Card.Title>
										}
										{
											tvmaze.network.name!==null
											&&
											<Card.Title className="text-center"> {tvmaze.network.name}</Card.Title>
										}
										{
											tvmaze.network.name===null
											&&
											<Card.Title className="text-center"> No Network Found </Card.Title>
										}
										{
											tvmaze.premiered!==null
											&&
											<Card.Title className="text-center"> {tvmaze.premiered} </Card.Title>
										}
										{
											tvmaze.premiered===null
											&&
											<Card.Title className="text-center"> No Premiered Date Found </Card.Title>
										}
										{
											omdb.totalSeasons!==null&&tvmaze._embedded.episodes.length!==null
											&&
											<Card.Title className="text-center"> S:{omdb.totalSeasons}E:{tvmaze._embedded.episodes.length} </Card.Title>
										}
										{
											omdb.totalSeasons===null&&tvmaze._embedded.episodes.length===null
											&&
											<Card.Title className="text-center"> No Season Info Found </Card.Title>
										}
										{
											omdb.rated!==null
											&&
											<Card.Title className="text-center"> {omdb.rated} </Card.Title>
										}
										{
											omdb.rated===null
											&&
											<Card.Title className="text-center"> No Rating Found </Card.Title>
										}
										{
											tvmaze.genres!==null
											&&
											<Card.Title className="text-center"> {tvmaze.genres} </Card.Title>
										}
										{
											tvmaze.genres===null
											&&
											<Card.Title className="text-center"> No Genre Found </Card.Title>
										}
										{
											tvmaze.rating.average!==null
											&&
											<Card.Title className="text-center"> TV Maze: {tvmaze.rating.average} </Card.Title>
										}
										{
											tvmaze.rating.average===null
											&&
											<Card.Title className="text-center"> No TV Maze Rating Found </Card.Title>
										}
										{
											omdb.imdbRating!==null
											&&
											<Card.Title className="text-center"> IMDB: {omdb.imdbRating} ({omdb.imdbVotes}) </Card.Title>
										}
										{
											omdb.imdbRating===null
											&&
											<Card.Title className="text-center"> No IMDB Rating Found </Card.Title>
										}
										{
											omdb.Plot!==null
											&&
											<Card.Title className="text-center"> Plot - {omdb.Plot} </Card.Title>
										}
										{
											omdb.Plot===null
											&&
											<Card.Title className="text-center"> {tvmaze.summary} </Card.Title>
										}
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
