import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./index.css";
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);
	this.changeHandler = this.changeHandler.bind(this);
	this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      username: "",
      password: "",
	  confirmPassword: "",
    };

  }


changeHandler = (e) => {
	this.setState({
      [e.target.name]: e.target.value
    });
}
submitHandler = e =>{
	e.preventDefault();
	console.log(this.state);

	const test = {
		name: "Hello World"
	}
	axios.post('http://localhost:3000/signup', test)
	.then(res=>{
		console.log(res);
	})
	.catch(err=>{
		console.log("ERR",err);
	})

}

  render() {
	  const { username, password, confirmPassword } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.submitHandler}>
					<div className="form-group">
						<input
							className="form-control"
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={this.changeHandler}/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="password"
							placeholder="Passowrd"
							value={password}
							onChange={this.changeHandler}/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={this.changeHandler}/>
					</div>
					<div className="form-group">
						<button type="Submit" className="btn btn-lg btn-info btn-block">Sign Up</button>
					</div>
				</form>
      </div>
    );
  }
}
