import React, {Component} from 'react';
import './App.css';
import Intro from '../intro';
import Main from '../Main';
import Series from '../../containers/Series';
import 'whatwg-fetch';


class App extends Component {


	render(){
		 return (
	       <div className="App">
	         <header className="App-header">
	             TV Series
	         </header>
		  <Main />
	       </div>
	     );
	}

}

export default App;
