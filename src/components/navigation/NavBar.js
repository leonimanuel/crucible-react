import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./navigation.css"

class NavBar extends Component {
	componentDidMount() {
		console.log(this.props.isLoggedIn)		
	}

	handleLogOut() {
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
					{ this.props.isLoggedIn ? <div onClick={this.handleLogOut}>Logout</div>
						: <Link to="/login" >Login</Link>  } 										
				</div>
			</div>
		)
	}
}


export default connect(state => ({isLoggedIn: state.isLoggedIn}))(NavBar);