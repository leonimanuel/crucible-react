import React, { Component } from 'react';
import { NavLink } from "react-router-dom"

class NavBar extends Component {
	redirect = (destination) => {
		console.log(destination)
	}

	render() {
		return (
			<div id="nav-wrapper">
				<NavLink to="/" >Home</NavLink>
				<NavLink to="/console" >Console</NavLink>
				<NavLink to="/review" >Review</NavLink>
				<NavLink to="/groups" >Groups</NavLink>				
			</div>
		)
	}
}


export default NavBar;