import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../assets/logo.png";
import './index.css';
import axios from 'axios'

class Series extends Component{
	state = {
		series: [],
		seriesName: '',
		isFetching: false,
		isMovieSearch: true,
		movie: [],
		movieName: ''
	}

	onSeriesInputChange = e =>{
		//Fetch from correct API depending on Series Search or Movie Search
		if(!this.state.isMovieSearch){
			this.setState({ seriesName: e.target.value, isFetching: true});
			fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
				.then( (response) => response.json() )
				.then( json => this.setState( { series: json, isFetching:false }))
				.catch( err => console.log(err));
		}
		else{
			console.log("It's a movie search");
			this.setState({ movieName: e.target.value, isFetching: true});
			axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c668e9ba0082ada9bd8061d745ade430&query=${e.target.value}`)
					.then(res=>{
						console.log("res: ", res.data.results);
						const movie = res.data;
						this.setState({ movie, isFetching:false });
						console.log(movie.results);
					});
		}

	}

	render(){
		const { series, seriesName, isFetching, isMovieSearch, movie, movieName } = this.state;
		return(
			<React.Fragment>
				<Container className="mainBox">
					<Row className="justify-content-md-center text-center">
						<Col lg="4" md="auto">
							<img className="logoStyle" alt="default" src={Logo}></img>
							{
								isMovieSearch
								&&
								<input
			   						value={movieName}
			   						type="text"
			   						onChange={this.onSeriesInputChange} />
							}
							{
								!isMovieSearch
								&&
								<input
			   						value={seriesName}
			   						type="text"
			   						onChange={this.onSeriesInputChange} />
							}

						</Col>
					</Row>
					<Row>
						<Col className="justify-content-md-center text-center">
							{
								!isFetching && movie.length===0 && movieName.trim() === '' && isMovieSearch
								&&
								<p className="enterDefaultText"> Please enter Movie Name </p>
							}
							{
								!isFetching && series.length===0 && seriesName.trim() === '' && !isMovieSearch
								&&
								<p className="enterDefaultText"> Please enter Series Name </p>
							}

							{
								!isFetching && series.length===0 && seriesName.trim() !== '' && !isMovieSearch
								&&
								<p> None Found </p>
							}
							{
								!isFetching && movie.length===0 && movieName.trim() !== '' && isMovieSearch
								&&
								<p> None Found </p>
							}
							{
								isFetching && <Loader />
							}
							{
								!isFetching && isMovieSearch && <SeriesList list={this.state.movie} isMovie={isMovieSearch}/>
							}
							{
								!isFetching && !isMovieSearch && <SeriesList list={this.state.series} isMovie={isMovieSearch}/>
							}
						</Col>
					</Row>
				</Container>
			</React.Fragment>


		)
	}
}

export default Series;
