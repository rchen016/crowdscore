import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Container, Row, Col, Card, Button, ProgressBar, Nav, Tab, Tabs  } from 'react-bootstrap';

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
							}
						);
					}
				});
	}

	render(){
		const { tvmaze } = this.state;
		const { omdb } = this.state;
		return(
			<React.Fragment>
				{ tvmaze===null && omdb===null }
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
										<Tabs defaultActiveKey="rating" id="singleSeriesTabs">
											<Tab eventKey="rating" title="Rating">
											{
												tvmaze.rating.average!==null
												&&
												<ProgressBar striped variant="success" now={tvmaze.rating.average*10} label={tvmaze.rating.average*10}/>
											}
											{
												tvmaze.rating.average===null
												&&
												<Card.Text className="text-center"> No TV Maze Rating Found </Card.Text>
											}
											{
												omdb.imdbRating!==null
												&&
												<ProgressBar striped variant="info" now={omdb.imdbRating*10} label={omdb.imdbRating*10}/>
											}
											{
												omdb.imdbRating===null
												&&
												<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
											}
											  </Tab>
											  <Tab eventKey="showInfo" title="Show Info">
											   {
												   omdb.Rated!==null
												   &&
												   <Card.Text> {omdb.Rated} </Card.Text>
											   }
											   {
												   omdb.Rated===null
												   &&
												   <Card.Text className="text-center"> No Rating Found </Card.Text>
											   }
											   {
												   tvmaze.genres!==null
												   &&
												   <Card.Text> {tvmaze.genres} </Card.Text>
											   }
											   {
												   tvmaze.genres===null
												   &&
												   <Card.Text className="text-center"> No Genre Found </Card.Text>
											   }
											   {
												   tvmaze.network.name!==null
												   &&
												   <Card.Text> {tvmaze.network.name}</Card.Text>
											   }
											   {
												   tvmaze.network.name===null
												   &&
												   <Card.Text className="text-center"> No Network Found </Card.Text>
											   }
											   {
												   tvmaze.premiered!==null
												   &&
												   <Card.Text> {tvmaze.premiered} </Card.Text>
											   }
											   {
												   tvmaze.premiered===null
												   &&
												   <Card.Text className="text-center"> No Premiered Date Found </Card.Text>
											   }
											   {
												   omdb.totalSeasons!==null&&tvmaze._embedded.episodes.length!==null
												   &&
												   <Card.Text> S:{omdb.totalSeasons}E:{tvmaze._embedded.episodes.length} </Card.Text>
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
													<Card.Text> Plot - {omdb.Plot} </Card.Text>
												}
												{
													omdb.Plot===null
													&&
													<Card.Text className="text-center"> {tvmaze.summary} </Card.Text>
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
