import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./navigation.css"

class NavBar extends Component {
	render() {
		return (
			<div id="nav-wrapper">
				<div id="menu-options">
					<Link className="nav-link" to="/" >Home</Link>
					<Link className="nav-link" to="/console" >Console</Link>
					<Link className="nav-link" to="/review" >Review</Link>
					<Link className="nav-link" to="/groups" >Groups</Link>								
				</div>
				<div id="profile-options">
					<Link to="/login" >Login</Link>													
				</div>
			</div>
		)
	}
}


export default NavBar;