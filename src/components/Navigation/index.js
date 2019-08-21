import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar{
		background-color: #222;
		margin-bottom: 25px;
	}
	.navbar-brand, .navbar-nav .nav-link {
		color: #FFF;
		&:hover{
			color: white;
		}
	}
	.navbar-toggler-icon{
		
	}
`;

export const NavigationBar = () =>(
	<Styles>
		<Navbar expand="lg">
			<Navbar.Brand className="titleFont" href="/">CS</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto navbar-light bg-light">
					<Nav.Item>
						<Nav.Link href="/">Login</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</Styles>
)
