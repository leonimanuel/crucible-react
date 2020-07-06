import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./navigation.css"

import { logOut } from "../../actions/users.js"

class NavBar extends Component {
	componentDidMount() {
		// console.log(this.props.isLoggedIn)		
	}

	handleLogOut = () => {
		this.props.logOut()
		localStorage.removeItem("token")
	}

	render() {
		return (
			<div id="nav-wrapper">
				<div id="menu-options">
					<Link className="nav-link section-nav-link" to="/" >Home</Link>
					<Link className="nav-link section-nav-link" to="/console" >Console</Link>
					<Link className="nav-link section-nav-link" to="/review" >Review</Link>
					<Link className="nav-link section-nav-link" to="/groups" >Groups</Link>												
				</div>
				<div id="profile-options">
					{ this.props.userName 
						? 
							<div className="dropdown">
								<div>{this.props.userName}</div>
								<div className="dropdown-content">
									<div className="nav-link" onClick={this.handleLogOut}>Logout</div>								
								</div>
							</div>
						: 
						<div>
							<Link className="nav-link" to="/login" >Login</Link>
							<Link className="nav-link" to="/signup" >Signup</Link>
						</div>
					} 										
				</div>
			</div>
		)
	}
}


export default connect(state => ({userName: state.users.userName}), { logOut })(NavBar);




