import React, { Component } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import EpisodeCard from '../../components/EpisodeCard';

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
		console.log("Single Epi");

		const { id } = this.props.match.params;
		console.log(id);
		fetch(`http://api.tvmaze.com/episodes/${id}`)
			.then( (response) => response.json() )
			.then(json => {this.setState( { tvmaze: json } ); console.log(json);});
	}

	render(){
		const { tvmaze } = this.state;
		return(
			<React.Fragment>
				<Container>
					<Row className="justify-content-md-center">
						<div onClick={this.goBack}>Back</div>
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
