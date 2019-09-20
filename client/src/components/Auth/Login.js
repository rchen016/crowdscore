import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "./index.css";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {}
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/"); // push user to dashboard when they login
		}
		if (nextProps.errors) {
			this.setState({
			errors: nextProps.errors
			});
		}
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
	};
render() {
    const { errors, email, password } = this.state;
return (
     <div className="authForm">
		 <form onSubmit={this.onSubmit}>
			 <div className="form-group">
				 <input
					 className={classnames("form-control", {
                    	invalid: errors.email || errors.emailnotfound
                  		})}
					 type="text"
					 name="email"
					 id="email"
					 error={errors.email}
					 placeholder="Email"
					 value={email}
					 onChange={this.onChange}/>
			 </div>
			 <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
			 <div className="form-group">
				 <input
					 className={classnames("form-control", {
                    	invalid: errors.password || errors.passwordincorrect
	                 	})}
					 type="password"
					 name="password"
					 id="password"
					 error={errors.password}
					 placeholder="Password"
					 value={password}
					 onChange={this.onChange}/>
			 </div>
			 <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
			 <p> Don't have Account? <Link to="/register">Register here</Link></p>
			 <div className="form-group">
				 <button type="Submit" className="btn btn-lg btn-info btn-block">Login</button>
			 </div>
		 </form>
	 </div>
    );
  }
}
Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
