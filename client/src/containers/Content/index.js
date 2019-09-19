import React, { Component } from 'react';
import ContentList from '../../components/ContentList';
import Loader from '../../components/Loader';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../../assets/logo.png";
import './index.css';
import axios from 'axios';
import loaderSrc from '../../assets/loader.gif';

class Content extends Component{

	constructor(props) {
		super(props);
		this.state = {
			series: [],
			seriesName: '',
			isFetching: false,
			isMovieSearch: true,
			movie: [],
			movieName: ''
		}
		this.onLogoClick = this.onLogoClick.bind(this);
	}



	onContentInputChange = e =>{
		//Fetch from correct API depending on Series Search or Movie Search
		if(!this.state.isMovieSearch){
			console.log("Series Query");
			this.setState({ seriesName: e.target.value, isFetching: true});
			fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
				.then( (response) => response.json() )
				.then( json => this.setState( { series: json, isFetching:false }))
				.catch( err => console.log(err));
		}
		else{
			console.log("Movie Query");
			if(e.target.value!==''){
				this.setState({ movieName: e.target.value, isFetching: true});
				axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c668e9ba0082ada9bd8061d745ade430&query=${e.target.value}`)
						.then(res=>{
							const movie = res.data;
							this.setState({ movie, isFetching:false });
						})
						.catch( err => console.log(err));
			}
			else{
				this.setState({ movieName: e.target.value, isFetching: false, movie:''});
			}
		}
	}

	onLogoClick = () =>{
		var toggle = !this.state.isMovieSearch;
		this.setState( ()=>{
			return { isMovieSearch:toggle }
		});
	}

	render(){
		const { series, seriesName, isFetching, isMovieSearch, movie, movieName } = this.state;
		return(
			<React.Fragment>
				<Container className="mainBox">
					<Row className="justify-content-md-center text-center">
						<Col lg="4" md="auto">

							<img className="logoStyle" alt="default" onClick={this.onLogoClick} src={Logo}></img>
							{
								isMovieSearch
								&&
								<input
			   						value={movieName}
			   						type="text"
			   						onChange={this.onContentInputChange} />
							}
							{
								!isMovieSearch
								&&
								<input
			   						value={seriesName}
			   						type="text"
			   						onChange={this.onContentInputChange} />
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
								isFetching && <Loader img={loaderSrc} sz={100}/>
							}
							{
								!isFetching && isMovieSearch && <ContentList list={this.state.movie} isMovie={isMovieSearch}/>
							}
							{
								!isFetching && !isMovieSearch && <ContentList list={this.state.series} isMovie={isMovieSearch}/>
							}
						</Col>
					</Row>

				</Container>
			</React.Fragment>


		)
	}
}

export default Content;
