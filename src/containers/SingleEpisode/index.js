import React, { Component } from 'react';
import { Container, Row, Col, Button  } from 'react-bootstrap';
import EpisodeCard from '../../components/EpisodeCard';
import "./index.css";

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
		fetch(`http://api.tvmaze.com/episodes/${id}`)
			.then( (response) => response.json() )
			.then(json => {this.setState( { tvmaze: json } ); console.log(json);})
			.catch( err => console.log(err));
	}

	render(){
		const { tvmaze } = this.state;

		return(
			<React.Fragment>
				<Button className="backBtn" onClick={this.goBack} variant="outline-dark">Back</Button>
				<Container>
					<Row className="justify-content-md-center">
						<Col lg="5">
							{
								tvmaze!==null
								&&
								<EpisodeCard tvmaze={ tvmaze }/>
							}

						</Col>
					</Row>
				</Container>
			</React.Fragment>
		)
	}
}

export default SingleEpisode;
