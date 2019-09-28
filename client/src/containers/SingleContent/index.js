import React, { Component } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import ContentCard  from '../../components/ContentCard';
import EpisodeList from '../../components/EpisodeList';
import "./index.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContent } from "../../actions/userActions";
import { withRouter } from "react-router-dom";

class SingleContent extends Component{
	state = {
		tvmaze: null,
		omdb: null,
		tmdb: null,
		searchMode: null,
		isFetching: null
	}

	constructor(){
		super();
		this.goBack = this.goBack.bind(this);
		this.addContentItem = this.addContentItem.bind(this);
	}

	goBack(){
		this.props.history.goBack();
	}

	addContentItem(contentItem){
		console.log("Adding Now...");
		console.log("CHECK: ", this.props.location.pathname);
		console.log("CHECK2 ", contentItem);
		//pass all the data to server to add into DB
		const contentLocation = this.props.location.pathname;
		const currentUser = this.props.auth.user;
		const storage = [];
		storage.push(currentUser);
		storage.push(contentItem);
		storage.push(contentLocation);
		// storage.push.()
		console.log("HMM", storage);
		this.props.addContent(storage,this.props.history);
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
					fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e00e4c89&t=${this.state.tmdb.original_title}`)
					.then( (response) => response.json() )
					.then( json =>this.setState( { omdb: json }))
				}
			)
			.catch( err => console.log(err));

		}
	}

	render(){
		const { tvmaze, omdb, tmdb, searchMode } = this.state;
		const { user } = this.props.auth;
		if( searchMode === "series"){
			return(
				<React.Fragment>
					{ tvmaze===null && omdb===null && tmdb===null }
					<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
					<Container>
						<Button onClick={()=>{this.addContentItem(tvmaze)}}> ADD </Button>
						<Row className="justify-content-md-center">
							<Col lg="5">
								{
									tvmaze!==null
									&&
									omdb!==null
									&&
									tmdb!==null
									&&
									<ContentCard tvmaze={tvmaze} omdb={omdb} tmdb={tmdb} searchMode={searchMode}/>
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
					{ tmdb===null && omdb===null }
					<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
					<Button onClick={this.addContent}> ADD </Button>
					<Container>
						<Row className="justify-content-md-center">
							<Col lg="5">
								{
									tmdb!==null
									&&
									omdb!==null
									&&
									<ContentCard tmdb={tmdb} omdb={omdb}/>
								}
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			)
		}


	}
}

SingleContent.propTypes = {
  auth: PropTypes.object.isRequired,
  addContent: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addContent }
)(withRouter(SingleContent));
