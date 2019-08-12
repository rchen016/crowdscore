import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../assets/logo.png";
import './index.css';

class Series extends Component{
	state = {
		series: [],
		seriesName: '',
		isFetching: false
	}

	onSeriesInputChange = e =>{
		this.setState({ seriesName: e.target.value, isFetching: true});
		fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
			.then( (response) => response.json() )
			.then( json => this.setState( { series: json, isFetching:false }));
	}

	render(){
		const { series, seriesName, isFetching } = this.state;
		return(
			<React.Fragment>
				<Container className="mainBox">
					<Row className="justify-content-md-center text-center">
						<Col md="auto">
							<img alt="default" src={Logo}></img>
							<input
		   						value={seriesName}
		   						type="text"
		   						onChange={this.onSeriesInputChange} />
						</Col>
					</Row>
					<Row>
						<Col className="justify-content-md-center text-center">
							{
								!isFetching && series.length===0 && seriesName.trim() === ''
								&&
								<p> Please enter Series Name </p>
							}
							{
								!isFetching && series.length===0 && seriesName.trim() !== ''
								&&
								<p> None Found </p>
							}
							{
								isFetching && <Loader />
							}
							{
								!isFetching && <SeriesList list={this.state.series} />
							}
						</Col>

					</Row>
				</Container>
			</React.Fragment>


		)
	}
}

export default Series;
