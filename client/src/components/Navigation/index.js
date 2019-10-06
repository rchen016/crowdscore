import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./index.css";

class NavBar extends Component {
onLogoutClick = e => {
  e.preventDefault();
  this.props.logoutUser();
};
	render(){
		const { user } = this.props.auth;
		return(

				<Navbar expand="lg">
					<Navbar.Brand className="titleFont" href="/">CS</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{
								user.name ? (
									<Nav.Item>
										<Nav.Link href="/profile">Profile</Nav.Link>
										<Nav.Link href="/settings">Settings</Nav.Link>
										<Nav.Link onClick={this.onLogoutClick}>Logout</Nav.Link>
									</Nav.Item>

								) : (
									<Nav.Item>
										<Nav.Link href="/login">Login</Nav.Link>
									</Nav.Item>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>

		);
	}
}

NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{ logoutUser }
)(NavBar);
