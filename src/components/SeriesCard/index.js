import React from 'react';
import { Card, ProgressBar, Tab, Tabs  } from 'react-bootstrap';
import defaultLogo from '../../assets/default.jpg';
import './index.css';

const SeriesCard = (props) => {

	if(props.searchMode==="series"){
		return(
			<Card className="sSeriesCard">
				{
					props.tvmaze.image!==null
					&&
					<Card.Img className="text-center" variant="top" src={props.tvmaze.image.original} />
				}
				{
					props.tvmaze.image===null
					&&
					<Card.Img variant="top" src={defaultLogo} />
				}
				<Card.Body>
					{
						props.tvmaze.name!==null
						&&
						<Card.Title className="text-center titleFont"> <strong> {props.tvmaze.name} </strong> </Card.Title>
					}
					{
						props.tvmaze.name===null
						&&
						<Card.Title className="text-center titleFont"> No Title Found </Card.Title>
					}
					<Tabs className="tabStyle" defaultActiveKey="rating" id="singleSeriesTabs">
						<Tab eventKey="rating" title="Rating">
								{
									props.tvmaze.rating.average!==null
									&&
									<ProgressBar
										className="progressBar"
										now={props.tvmaze.rating.average*10}
										label={"TV Maze "+props.tvmaze.rating.average}/>

								}
								{
									props.tvmaze.rating.average===null
									&&
									<Card.Text className="text-center"> No TV Maze Rating Found </Card.Text>
								}
								{
									props.omdb.imdbRating!==null
									&&
									<ProgressBar
										className="progressBar"
										now={props.omdb.imdbRating*10}
										label={"IMDB "+props.omdb.imdbRating+" ("+props.omdb.imdbVotes+")"}/>
								}
								{
									props.omdb.imdbRating===null
									&&
									<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
								}
								{
									props.tmdb.results[0].vote_count!==null
									&&
									<ProgressBar
										className="progressBar"
										now={props.tmdb.results[0].vote_average * 10}
										label={"TMDB "+props.tmdb.results[0].vote_average+" ("+props.tmdb.results[0].vote_count+")"}/>
								}
								{
									props.tmdb.results[0].vote_coun===null
									&&
									<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
								}
						  </Tab>
						  <Tab eventKey="showInfo" className="tabFont" title="Show Info">
							   {
								   props.omdb.Rated!==null
								   &&
								   <Card.Title className="showInfoContent tvRated"> <strong>{props.omdb.Rated}</strong> </Card.Title>
							   }
							   {
								   props.omdb.Rated===null
								   &&
								   <Card.Text className="text-center"> No Rating Found </Card.Text>
							   }
							   {
								 props.omdb.Genre!==null
								 &&
								 <Card.Text className="showInfoContent"> {props.omdb.Genre} </Card.Text>
							   }
							   {
								 props.omdb.Genre===null
								 &&
								 <Card.Text className="text-center"> No Genre Found </Card.Text>
							   }
							   {
								 props.tvmaze.network!==null
								 &&
								 <Card.Text className="showInfoContent"> {props.tvmaze.network.name} </Card.Text>
							   }
							   {
								 props.tvmaze.network===null && props.tvmaze.webChannel!==null
								 &&
								 <Card.Text className="showInfoContent"> {props.tvmaze.webChannel.name} </Card.Text>
							   }
							   {
								   props.tvmaze.network===null && props.tvmaze.webChannel===null
								   &&
								    <Card.Text className="text-center"> No Network Found </Card.Text>
							   }
							   {
								 props.tvmaze.premiered!==null
								 &&
								 <Card.Text className="showInfoContent"> {props.tvmaze.premiered} </Card.Text>
							   }
							   {
								 props.tvmaze.premiered===null
								 &&
								 <Card.Text className="text-center"> No Premiered Date Found </Card.Text>
							   }
							   {
								 props.omdb.totalSeasons!==null&&props.tvmaze._embedded.episodes.length!==null
								 &&
								 <Card.Text className="showInfoContent"> S:{props.omdb.totalSeasons}E:{props.tvmaze._embedded.episodes.length} </Card.Text>
							   }
							   {
								 props.omdb.totalSeasons===null&&props.tvmaze._embedded.episodes.length===null
								 &&
								 <Card.Text className="text-center"> No Season Info Found </Card.Text>
							   }
						  </Tab>
						  <Tab eventKey="plot" className="tabFont" title="Plot">
								{
									props.omdb.Plot!==null
									&&
									<Card.Text className="showInfoContent"> {props.omdb.Plot} </Card.Text>
								}
								{
									props.omdb.Plot===null
									&&
									<Card.Text className="text-center"> {props.tvmaze.summary} </Card.Text>
								}
						  </Tab>
						  <Tab eventKey="cast" className="tabFont" title="Cast">
							  {
								  props.omdb.Actors!==null
								  &&
								  <Card.Text className="showInfoContent"> {props.omdb.Actors} </Card.Text>
							  }
							  {
								  props.omdb.Actors===null
								  &&
								  <Card.Text className="text-center"> No Actor Info Found! </Card.Text>
							  }
						  </Tab>
					</Tabs>
				</Card.Body>
			</Card>
			)
	}
	else{
		return(
			<Card className="sMovieCard">
				{
					props.tmdb.poster_path!==null
					&&
					<Card.Img className="text-center" variant="top" src={"http://image.tmdb.org/t/p/w185"+props.tmdb.poster_path} />
				}
				{
					props.tmdb.poster_path===null
					&&
					<Card.Img variant="top" src={defaultLogo} />
				}
				<Card.Body>
					{
						props.tmdb.original_title!==null
						&&
						<Card.Title className="text-center titleFont"> <strong> {props.tmdb.original_title} </strong> </Card.Title>
					}
					{
						props.tmdb.original_title===null
						&&
						<Card.Title className="text-center titleFont"> No Title Found </Card.Title>
					}
					<Tabs className="tabStyle" defaultActiveKey="rating" id="singleSeriesTabs">
						<Tab eventKey="rating" title="Rating">
								{
									props.tmdb.vote_count!==null
									&&
									<ProgressBar
										className="progressBar"
										now={props.tmdb.vote_average * 10}
										label={"TMDB "+props.tmdb.vote_average+" ("+props.tmdb.vote_count+")"}/>
								}
								{
									props.tmdb.vote_count===null
									&&
									<Card.Text className="text-center"> No IMDB Rating Found </Card.Text>
								}
						  </Tab>
						  <Tab eventKey="showInfo" className="tabFont" title="Show Info">
							    {
 								   props.tmdb.genres!==null
 								   &&
 								   <Card.Title className="showInfoContent tvRated"> <strong>{props.tmdb.genres[0].name}</strong> </Card.Title>
 							   }
 							   {
 								    props.tmdb.genres===null
 								   &&
 								   <Card.Text className="text-center"> No Rating Found </Card.Text>
 							   }
							   {
								  props.tmdb.release_date!==null
								  &&
								  <Card.Title className="showInfoContent tvRated"> {props.tmdb.release_date} </Card.Title>
							  }
							  {
								   props.tmdb.release_date===null
								  &&
								  <Card.Text className="text-center"> No Rating Found </Card.Text>
							  }
							  {
								 props.tmdb.budget!==null
								 &&
								 <Card.Title className="showInfoContent tvRated"> {"Budget: $"+props.tmdb.budget} </Card.Title>
							 }
							 {
								  props.tmdb.budget===null
								 &&
								 <Card.Text className="text-center"> No Rating Found </Card.Text>
							 }
							 {
								props.tmdb.status!==null
								&&
								<Card.Title className="showInfoContent tvRated"> {"Status: "+props.tmdb.status} </Card.Title>
							}
							{
								 props.tmdb.status===null
								&&
								<Card.Text className="text-center"> No Rating Found </Card.Text>
							}
						  </Tab>
						  <Tab eventKey="plot" className="tabFont" title="Plot">
							{
								props.tmdb.overview!==null
								&&
								<Card.Text className="showInfoContent"> {props.tmdb.overview} </Card.Text>
							}
							{
								props.tmdb.overview===null
								&&
								<Card.Text className="text-center"> Nothing Found! </Card.Text>
							}
						  </Tab>
						  <Tab eventKey="cast" className="tabFont" title="Cast">
							 Tab3
						  </Tab>
					</Tabs>
				</Card.Body>
			</Card>
		)
	}

}

export default SeriesCard;
