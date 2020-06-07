import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./navigation.css"

class NavBar extends Component {
	render() {
		return (
			<div id="nav-wrapper">
				<div id="menu-options">
					<Link class="nav-link" to="/" >Home</Link>
					<Link class="nav-link" to="/console" >Console</Link>
					<Link class="nav-link" to="/review" >Review</Link>
					<Link class="nav-link" to="/groups" >Groups</Link>								
				</div>
				<div id="profile-options">
					<Link to="/login" >Login</Link>													
				</div>
			</div>
		)
	}
}


export default NavBar;