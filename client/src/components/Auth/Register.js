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
    const { errors, name, email, password, password2 } = this.state;
	return (
			<div className="authForm">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							className={classnames("form-control", {
								invalid: errors.name
								})}
							type="text"
							name="name"
							id="name"
							error={errors.name}
							placeholder="Name"
							value={name}
							onChange={this.onChange}/>
					</div>
					<div className="form-group">
						<input
							className={classnames("form-control", {
								invalid: errors.email
								})}
							type="text"
							name="email"
							id="email"
							error={errors.email}
							placeholder="Email"
							value={email}
							onChange={this.onChange}/>
					</div>
					<div className="form-group">
						<input
						className={classnames("form-control", {
							invalid: errors.password
							})}
						type="password"
						name="password"
						id="password"
						error={errors.password}
						placeholder="Password"
						value={password}
						onChange={this.onChange}/>
					</div>
					<div className="form-group">
						<input
						className={classnames("form-control", {
							invalid: errors.password2
							})}
						type="password"
						name="password2"
						id="password2"
						error={errors.password2}
						placeholder="Confirm Password"
						value={password2}
						onChange={this.onChange}/>
					</div>
					<p> Already have Account? <Link to="/login">Log In </Link></p>
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
