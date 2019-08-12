import React, { Component } from 'react';
import { Container, Row, Col, Card, ProgressBar, Tab, Tabs  } from 'react-bootstrap';
import './index.css';

class SingleSeries extends Component{
	state = {
		tvmaze: null,
		omdb: null,
		tmdb: null
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
			.then( (response) => response.json() )
			.then(
					json => {
						console.log(json);
					if(json===null) this.setState( { tvmaze: null });
					else
					{
						this.setState( { tvmaze: json });
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.tvmaze.name}`)
						.then((response) => response.json())
						.then(
							json =>{
								console.log(json);
								if(json===null) this.setState( { omdb: null });
								else this.setState( { omdb: json });
								fetch(`https://api.themoviedb.org/3/search/tv?api_key=c668e9ba0082ada9bd8061d745ade430&language=en-US&query=${this.state.tvmaze.name}`)
								.then( (response) => response.json() )
								.then( json =>{
										console.log(json.results[0]);
										this.setState( { tmdb: json.results[0]} );
									}
								)
							}
						);
					}
				});
	}

	render(){
		const { tvmaze } = this.state;
		const { omdb } = this.state;
		const { tmdb } = this.state;
		return(
			<React.Fragment>
				{ tvmaze===null && omdb===null && tmdb===null}
				<Container>
					<Row>
						<Col>
							{
								tvmaze!==null
								&&
								omdb!==null
								&&
								tmdb!==null
								&&
								<Card className="sSeriesCard">
									{
										tvmaze.image!==null
										&&
										<Card.Img className="text-center" variant="top" src={tvmaze.image.original} />
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
										<Tabs className="tabStyle" defaultActiveKey="rating" id="singleSeriesTabs">
											<Tab eventKey="rating" title="Rating">
													{
														tvmaze.rating.average!==null
														&&
														<ProgressBar
															className="progressBar"
															striped variant="success"
															now={tvmaze.rating.average*10}
															label={"TV Maze "+tvmaze.rating.average}/>

													}
													{
														tvmaze.rating.average===null
														&&
														<Card.Text className="text-center"> No TV Maze Rating Found </Card.Text>
													}
													{
														omdb.imdbRating!==null
														&&
														<ProgressBar
															className="progressBar"
															striped variant="info"
															now={omdb.imdbRating*10}
															label={"IMDB "+omdb.imdbRating+" ("+omdb.imdbVotes+")"}/>
													}
													{
														omdb.imdbRating===null
														&&
														<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
													}
													{
														tmdb.vote_count!==null
														&&
														<ProgressBar
															className="progressBar"
															striped variant="danger"
															now={tmdb.vote_average * 10}
															label={"TMDB "+tmdb.vote_average+" ("+tmdb.vote_count+")"}/>
													}
													{
														tmdb.vote_count===null
														&&
														<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
													}

											  </Tab>
											  <Tab eventKey="showInfo" title="Show Info">
												   {
													   omdb.Rated!==null
													   &&
													   <Card.Title className="showInfoContent tvRated"> {omdb.Rated} </Card.Title>
												   }
												   {
													   omdb.Rated===null
													   &&
													   <Card.Text className="text-center"> No Rating Found </Card.Text>
												   }
												   {
													   tvmaze.genres!==null
													   &&
													   <Card.Text className="showInfoContent"> {tvmaze.genres} </Card.Text>
												   }
												   {
													   tvmaze.genres===null
													   &&
													   <Card.Text className="text-center"> No Genre Found </Card.Text>
												   }
												   {
													   tvmaze.network.name!==null
													   &&
													   <Card.Text className="showInfoContent"> {tvmaze.network.name}</Card.Text>
												   }
												   {
													   tvmaze.network.name===null
													   &&
													   <Card.Text className="text-center"> No Network Found </Card.Text>
												   }
												   {
													   tvmaze.premiered!==null
													   &&
													   <Card.Text className="showInfoContent"> {tvmaze.premiered} </Card.Text>
												   }
												   {
													   tvmaze.premiered===null
													   &&
													   <Card.Text className="text-center"> No Premiered Date Found </Card.Text>
												   }
												   {
													   omdb.totalSeasons!==null&&tvmaze._embedded.episodes.length!==null
													   &&
													   <Card.Text className="showInfoContent"> S:{omdb.totalSeasons}E:{tvmaze._embedded.episodes.length} </Card.Text>
												   }
												   {
													   omdb.totalSeasons===null&&tvmaze._embedded.episodes.length===null
													   &&
													   <Card.Text className="text-center"> No Season Info Found </Card.Text>
												   }
											  </Tab>
											  <Tab eventKey="plot" title="Plot">
													{
														omdb.Plot!==null
														&&
														<Card.Text className="showInfoContent"> {omdb.Plot} </Card.Text>
													}
													{
														omdb.Plot===null
														&&
														<Card.Text className="text-center"> {tvmaze.summary} </Card.Text>
													}
											  </Tab>
											  <Tab eventKey="cast" title="Cast">
												  {
													  omdb.Actors!==null
													  &&
													  <Card.Text className="showInfoContent"> {omdb.Actors} </Card.Text>
												  }
												  {
													  omdb.Actors===null
													  &&
													  <Card.Text className="text-center"> No Actor Info Found! </Card.Text>
												  }
											  </Tab>
										</Tabs>
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
