import React, { Component } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import ContentCard  from '../../components/ContentCard';
import EpisodeList from '../../components/EpisodeList';
import "./index.css";
import Loader from "../../components/Loader";
import loaderSrc from '../../assets/loader.gif';

class SingleContent extends Component{
	state = {
		tvmaze: null,
		omdb: null,
		tmdb: null,
		searchMode: null,
		isFetching: null
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
			this.setState({ isFetching: true});
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
											this.setState( { tmdb: json, isFetching: false } );
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
			this.setState({ isFetching: true});
			fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c668e9ba0082ada9bd8061d745ade430&append_to_response=credits`)
			.then( (response) => response.json() )
			.then( json =>{
					console.log(json);
					this.setState( { tmdb: json } );
					fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.tmdb.original_title}`)
					.then( (response) => response.json() )
					.then( json =>this.setState( { omdb: json, isFetching: false }))
				}
			)
			.catch( err => console.log(err));

		}
	}

	render(){
		const { tvmaze, omdb, tmdb, searchMode, isFetching } = this.state;

		if( searchMode === "series"){
			return(
				<React.Fragment>
					{ tvmaze===null && omdb===null && tmdb===null}
					<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
					<Container>
						<Row className="justify-content-md-center">

							<Col lg="5">
								{
									!isFetching
									&&
									tvmaze!==null
									&&
									omdb!==null
									&&
									tmdb!==null
									&&
									<ContentCard tvmaze={tvmaze} omdb={omdb} tmdb={tmdb} searchMode={searchMode}/>
								}
								{
									!isFetching
									&&
									tvmaze!==null
									&&
									<EpisodeList tvmaze={tvmaze} searchMode={searchMode}/>
								}
								{
									isFetching
									&&
									<Loader img={loaderSrc} sz={320}/>
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
					{ tmdb===null && omdb===null }
					<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
					<Container>
						<Row className="justify-content-md-center">
							<Col lg="5">
								{
									!isFetching
									&&
									tmdb!==null
									&&
									omdb!==null
									&&
									<ContentCard tmdb={tmdb} omdb={omdb}/>
								}
								{
									isFetching
									&&
									<Loader img={loaderSrc} sz={320}/>
								}
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			)
		}


	}
}

export default SingleContent;
