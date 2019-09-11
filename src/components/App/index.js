import React, {Component} from 'react';
import './App.css';
import Main from '../Main';
import 'whatwg-fetch';
import  NavigationBar  from '../Navigation';

class App extends Component {
	render(){
		 return (
			<React.Fragment >
				<NavigationBar />
				<Main/>
			</React.Fragment>
	     );
	}

}

export default App;
