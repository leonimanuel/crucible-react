import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./navigation.css"

import { logOut } from "../../actions/users.js"

class NavBar extends Component {
	componentDidMount() {
		console.log(this.props.isLoggedIn)		
	}

	handleLogOut = () => {
		this.props.logOut()
		localStorage.removeItem("token")
	}

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
					{ this.props.isLoggedIn ? <div className="nav-link" onClick={this.handleLogOut}>Logout</div>
						: <Link className="nav-link" to="/login" >Login</Link>  } 										
				</div>
			</div>
		)
	}
}


export default connect(state => ({isLoggedIn: state.isLoggedIn}), { logOut })(NavBar);




