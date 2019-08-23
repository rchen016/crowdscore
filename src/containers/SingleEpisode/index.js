import React, { Component } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import EpisodeCard from '../../components/EpisodeCard';
import "./index.css";
import loaderSrc from '../../assets/loader.gif';
import Loader from '../../components/Loader';

class SingleEpisode extends Component{
	state = {
		tvmaze: null
	}

	constructor(props){
		super(props);
		this.goBack = this.goBack.bind(this);
	}

	goBack(){
		this.props.history.goBack();
	}
	componentDidMount(){
		const { id } = this.props.match.params;
		//Fetch Single Episode to pass to Episode Card Component
		this.setState({ isFetching: true});
		fetch(`http://api.tvmaze.com/episodes/${id}`)
			.then( (response) => response.json() )
			.then(json => {this.setState( { tvmaze: json, isFetching: false } ); console.log(json);})
			.catch( err => console.log(err));
	}

	render(){
		const { tvmaze, isFetching } = this.state;

		return(
			<React.Fragment>
				<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
				<Container>
					<Row className="justify-content-md-center">
						<Col lg="5">
							{
								!isFetching
								&&
								tvmaze!==null
								&&
								<EpisodeCard tvmaze={ tvmaze }/>
							}
							{
								isFetching
								&&
								<Loader img={loaderSrc} sz={330} />
							}
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}

export default SingleEpisode;
