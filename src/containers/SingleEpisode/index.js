import React, { Component } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import EpisodeCard from '../../components/EpisodeCard';

class SingleEpisode extends Component{
	state = {
		tvmaze: null
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
					<Row>
						<Col>
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
