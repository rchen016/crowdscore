import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./index.css";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
render() {
    const { errors, name, email, password,password2 } = this.state;
	return (

		<div className="authForm">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							className={classnames("form-control", {
		                       	invalid: errors.name || errors.nameincorrect
		   	                 	})}
							type="text"
							name="name"
							placeholder="Name"
							id="name"
							value={name}
							onChange={this.onChange}/>
					</div>
					<span className="red-text">
	                     {errors.name}
	                     {errors.nameincorrect}
	                   </span>
					<div className="form-group">
						<input
						className={classnames("form-control", {
							invalid: errors.email || errors.emailincorrect
							})}
						type="text"
						name="email"
						placeholder="Email"
						value={email}
						id="email"
						onChange={this.onChange}/>
					</div>
					<span className="red-text">
	                     {errors.email}
	                     {errors.emailincorrect}
	                   </span>
					<div className="form-group">
						<input
						className={classnames("form-control", {
							invalid: errors.password || errors.passwordincorrect
							})}
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={password}
						onChange={this.onChange}/>
					</div>
					<span className="red-text">
	                     {errors.password}
	                     {errors.passwordincorrect}
	                   </span>
					<div className="form-group">
						<input
						className={classnames("form-control", {
							invalid: errors.password2 || errors.password2incorrect
							})}
						type="password"
						name="password2"
						id="password2"
						placeholder="Confirm Password"
						value={password2}
						onChange={this.onChange}/>
					</div>
					<span className="red-text">
	                     {errors.password2}
	                     {errors.password2incorrect}
	                   </span>
					<p> Already have account? <Link to="/login">Login</Link></p>
					<div className="form-group">
						<button type="Submit" className="btn btn-lg btn-info btn-block">Sign Up</button>
					</div>
				</form>
			</div>
	    );
  	}
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
