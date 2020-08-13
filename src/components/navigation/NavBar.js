import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./navigation.css"

import { logOut } from "../../actions/users.js"
import { API_ROOT } from "../../constants"

class NavBar extends Component {
	handleLogOut = () => {
		this.props.logOut();
		localStorage.removeItem("token")
	}

	handleEmail = (email) => {
    let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token"),
	    }
	  	//,
			// body: JSON.stringify({
			// 	inviteEmail: email,
			// })
		}

	  fetch(API_ROOT + `/email`, configObj)
	  //   .then(resp => resp.json())
	  //   .then((response) => {
			// 	debugger
			// })
	}


	render() {
		// debugger
		return (
			<div id="nav-wrapper">
				<div id="menu-options">											
					<Link className="nav-link section-nav-link" to="/" >Home</Link>
				</div>
				
				{this.props.user ?
					<div id="user-ranks">
						{/*<div><b>Reputability: </b>{this.props.user.reputability_score * 100}%</div>
						<div><b>Peer Score: </b>{this.props.userReviewScore}</div>*/}
					</div>
					: null
				}
				{/*<button onClick={this.handleEmail}>Email Leon</button>	*/}			

				<div id="profile-options">
					{ this.props.userName 
						? 
							<div className="dropdown">
								<div className="nav-link user-dropdown">{this.props.userName}</div>
								<div className="dropdown-content">
									<div className="nav-link dropdown-item" onClick={this.handleLogOut}>Logout</div>								
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

const mapStateToProps = state => {
	return {
		userName: state.users.userName,
		user: state.users.user,
		userReviewScore: state.users.userReviewScore
	}
}

export default connect(mapStateToProps, { logOut })(NavBar);




