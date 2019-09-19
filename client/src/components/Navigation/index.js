import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

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

export const NavBar = () =>(
	<Styles>
		<Navbar expand="lg">
			<Navbar.Brand className="titleFont" href="/">CS</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Item>
						<Nav.Link href="/login">Login</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</Styles>
)
