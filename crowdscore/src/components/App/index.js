import React, {Component} from 'react';
import './App.css';
import Intro from '../intro';
import Series from '../../containers/Series';
import 'whatwg-fetch';


class App extends Component {


	render(){
		 return (
	       <div className="App">
	         <header className="App-header">
	             TV Series
	         </header>
	   	  <Intro message="Here you can find all your most loved series"/>
		  <Series />
	       </div>
	     );
	}

}

export default App;
