import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import { Container  } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
	.navbar{
		background-color: #222;
		margin-top: 500px;
	}
	.navbar-brand, .navbar-nav .nav-link {
		color: #FFF;
		&:hover{
			color: white;
		}
	}
	.fixed-bottom{
		z-index: -1000000;
	}
`;

export const Footer = () =>(
	<Styles>
		<div className="fixed-bottom">
			<Navbar>
				<Container>
					<NavbarBrand>© Ricky Chen</NavbarBrand>
				</Container>
			</Navbar>
		</div>
	</Styles>
)
