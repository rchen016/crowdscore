import React, {Component} from 'react';
import './App.css';
import Intro from '../intro';
import 'whatwg-fetch';


class App extends Component {
	state = {
		series: []
	}

	componentDidMount(){
		fetch("http://api.tvmaze.com/search/shows?q=Vikings")
			.then( (response) => response.json() )
			.then( json => this.setState( { series: json }));
	}

	render(){
		 return (
	       <div className="App">
	         <header className="App-header">
	             TV Series
	         </header>
	   	  <Intro message="Here you can find all your most loved series"/>
	   	  The Length of series array - {this.state.series.length}
	       </div>
	     );
	}

}

export default App;
