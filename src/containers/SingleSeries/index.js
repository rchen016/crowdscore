import React, { Component } from 'react';
import { Container, Row, Col, Card, ProgressBar, Tab, Tabs  } from 'react-bootstrap';

import defaultLogo from '../../assets/default.jpg';
import SeriesCard  from '../../components/Card';

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
						this.setState( { tvmaze: json });
						fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.tvmaze.name}`)
						.then( (response) => response.json() )
						.then(
							json =>{
								console.log("OMDB");
								console.log(json);
								this.setState( { omdb: json } );
								fetch(`https://api.themoviedb.org/3/search/tv?api_key=c668e9ba0082ada9bd8061d745ade430&language=en-US&query=${this.state.tvmaze.name}`)
								.then( (response) => response.json() )
								.then( json =>{
										console.log(json);
										this.setState( { tmdb: json } );
									}
								)
							}
						);
				});
	}

	render(){
		const { tvmaze } = this.state;
		const { omdb } = this.state;
	 	const { tmdb } = this.state;
		return(
			<React.Fragment>
				{ tvmaze===null && omdb===null && tmdb===null }
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
								<SeriesCard tvmaze={tvmaze} omdb={omdb} tmdb={tmdb}/>
							}
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}

export default SingleSeries;
