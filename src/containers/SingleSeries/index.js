import React, { Component } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import SeriesCard  from '../../components/SeriesCard';
import EpisodeList from '../../components/EpisodeList';
import "./index.css";

class SingleSeries extends Component{
	state = {
		tvmaze: null,
		omdb: null,
		tmdb: null,
		searchMode: null
	}

	constructor(props){
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack(){
		this.props.history.goBack();
	}

	componentDidMount(){
		this.setState({searchMode: this.props.location.pathname.split("/")[1]});
		console.log(this.props.location.pathname.split("/")[1]);

		//Determmine if its a series search or movie search
		if( this.props.location.pathname.split("/")[1] === "series" ){
			const { id } = this.props.match.params;
			console.log("Issa Series");
			fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
				.then( (response) => response.json() )
				.then(
						json => {
							console.log(json);
							this.setState( { tvmaze: json } );
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
											console.log(typeof json);
											this.setState( { tmdb: json } );
										}
									)
								}
							)
							.catch( err => console.log(err));
					});
		}
		else{
			const { id } = this.props.match.params;
			console.log("Issa Movie", id);
			fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c668e9ba0082ada9bd8061d745ade430&append_to_response=credits`)
			.then( (response) => response.json() )
			.then( json =>{
					console.log(json);
					this.setState( { tmdb: json } );
				}
			)

		}
	}

	render(){
		const { tvmaze } = this.state;
		const { omdb } = this.state;
	 	const { tmdb } = this.state;
		const { searchMode } = this.state;

		if( searchMode === "series"){
			return(
				<React.Fragment>
					{ tvmaze===null && omdb===null && tmdb===null}
					<Container>
						<Row className="justify-content-md-center">
							<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
							<Col lg="5">
								{
									tvmaze!==null
									&&
									omdb!==null
									&&
									tmdb!==null
									&&
									<SeriesCard tvmaze={tvmaze} omdb={omdb} tmdb={tmdb} searchMode={searchMode}/>
								}
								{
									tvmaze!==null
									&&
									<EpisodeList tvmaze={tvmaze} searchMode={searchMode}/>
								}
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			)
		}
		else{
			return(
				<React.Fragment>
					{ tmdb===null }
					<Container>
						<Row className="justify-content-md-center">
							<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
							<Col lg="5">
								{
									tmdb!==null
									&&
									<SeriesCard tmdb={tmdb}/>
								}
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			)
		}


	}
}

export default SingleSeries;
