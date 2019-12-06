import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import defaultLogo from '../../assets/default.jpg';
import './index.css';

function name(rating){
	console.log("Test",rating);
	// axios.post("/addUserRating",)
}

const ContentCard = (props) => {
	console.log("location ","/"+props.searchMode+"/"+props.tvmaze.id);
	console.log(props.tvmaze.id);
	if(props.searchMode==="series"){
		return(


			<Card className="sSeriesCard">
			<form
				method="POST"
				action="test"
			>
				<select onChange={name(this)} name="ratingSys">
					<option value={"1,"+props.auth.user.id+","+"/"+props.searchMode+"/"+props.tvmaze.id}>1</option>
					<option value={"2,"+props.auth.user.id}>2</option>
					<option value={"3,"+props.auth.user.id}>3</option>
					<option value={"4,"+props.auth.user.id}>4</option>
					<option value={"5,"+props.auth.user.id}>5</option>
					<option value={"6,"+props.auth.user.id}>6</option>
					<option value={"7,"+props.auth.user.id}>7</option>
					<option value={"8,"+props.auth.user.id}>8</option>
					<option value={"9,"+props.auth.user.id}>9</option>
					<option value={"10,"+props.auth.user.id}>10</option>
				</select>
				<button type="submit">Submit</button>
			</form>

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
									<ProgressBar
										className="progressBar"
										now={0}
										label={"TV Maze: 0"}/>

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
									<ProgressBar
										className="progressBar"
										now={0}
										label={"IMDB: 0"}/>
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
									props.tmdb.results[0].vote_count===null
									&&
									<ProgressBar
										className="progressBar"
										now={0}
										label={"TMDB: 0"}/>
								}
								{
									props.tmdb.results[0].vote_count!==null
									&&
									<ProgressBar
										className="progressBar"
										now={95}
										label={"User 95 (10000)"}/>
								}
								{
									props.tmdb.results[0].vote_count===null
									&&
									<ProgressBar
										className="progressBar"
										now={0}
										label={"User Rating: 0"}/>
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
									<ProgressBar
										className="progressBar"
										now={0}
										label={"TMDB: 0"}/>
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
									<ProgressBar
										className="progressBar"
										now={0}
										label={"IMDB: 0"}/>
								}
						  </Tab>
						  <Tab eventKey="showInfo" className="tabFont" title="Show Info">
							    {
 								   Object.keys(props.tmdb.genres).length!==0
 								   &&
 								   <Card.Title className="showInfoContent tvRated"> <strong>{props.tmdb.genres[0].name}</strong> </Card.Title>
 							   }
 							   {
								   Object.keys(props.tmdb.genres).length===0
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
							 {
								 props.tmdb.credits!==null
								 &&
								 <Card.Text className="showInfoContent">
									{props.tmdb.credits.cast.slice(0,10).map(data=>(
										<li key={data.name}>{data.name}</li>
									))}
								 </Card.Text>
							 }
							 {
								 props.tmdb.credits===null
								 &&
								 <Card.Text className="text-center"> No Actor Info Found! </Card.Text>
							 }
						  </Tab>
					</Tabs>
				</Card.Body>
			</Card>
		)
	}

}

// export default ContentCard;
ContentCard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(ContentCard);
