import React, {Component} from 'react';
import './App.css';
import Main from '../Main';
import 'whatwg-fetch';
import { NavigationBar } from '../Navigation';
// import { Footer } from '../Footer';
import { Provider } from "react-redux";
import store from "../../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
	render(){
		 return (
			<Provider store={store}>
				<React.Fragment >
					<NavigationBar />
					<Main/>
				</React.Fragment>
			</Provider>
	     );
	}

}

export default App;
