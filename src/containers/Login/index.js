import React, { Component } from "react";
import axios from 'axios';
import "./index.css";

export default class Login extends Component{

	constructor(props){
		super(props);

		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.state = {
			username: "",
			password: ""
		}
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	submitHandler = e =>{
		e.preventDefault();
		console.log(this.state);

		axios.post('/login', this.state)
			.then(res=>{
				console.log("Results:")
				console.log(res);
				console.log(res.config.data);
				//return res;
				console.log("THIS? ", this);
				this.props.history.push("/");
			})
			.catch(err=>{
				console.log("ERR",err);
			})
			console.log("Check2");
	}

	render(){

		const { username, password } = this.state;

		return(
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
						<button type="Submit" className="btn btn-lg btn-info btn-block">Login</button>
					</div>
				</form>
			</div>
		);
	}
}
