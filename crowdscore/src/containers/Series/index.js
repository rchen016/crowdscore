import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';

class Series extends Component{
	state = {
		series: []
	}

	componentDidMount(){

	}

	onSeriesInputChange = e =>{
		fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
			.then( (response) => response.json() )
			.then( json => this.setState( { series: json }));
	}

	render(){
		return(
			<div>
				The Length of series array - {this.state.series.length}
				<SeriesList list={this.state.series} />
				<div>
					<input type="text" onChange={this.onSeriesInputChange} />
				</div>
			</div>

		)
	}
}

export default Series;
