import React, { Component } from "react";
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const Styles = styled.div`
	.navbar{
		background-color: #222;
		margin-bottom: 25px;
	}
	.navbar-brand, .navbar-nav .nav-link {
		&:hover{
			color: white;
		}
	}
	a.nav-link{
		background: #222;
		color: #FFF !important;
	}
	a.titleFont{
		color: #FFF;
	}
`;

export default class NavigationBar extends Component{

	constructor(props){
		super(props);
		this.submitHandler = this.submitHandler.bind(this);
	}

	submitHandler = e =>{
		e.preventDefault();
		axios.post('/logout', this.state)
			.then(res=>{
				console.log("Results:")
				console.log(res);
				console.log(res.config.data);
				//return res;
				console.log("Check");
				console.log("THIS? ", this);
				window.location.reload();
			})
			.catch(err=>{
				console.log("ERR",err);
			})
			console.log("Check2");
	}


	render(){
		return(
			<Styles>
				<Navbar expand="lg">
					<Navbar.Brand className="titleFont" href="/">CS</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Item>
								<Nav.Link href="/login">Login</Nav.Link>
								<Nav.Link onClick={this.submitHandler} href="/logout">Logout</Nav.Link>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Styles>
		);
	}
}
