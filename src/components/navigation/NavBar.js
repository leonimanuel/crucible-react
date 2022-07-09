import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import "./navigation.scss"

import Popup from 'reactjs-popup';
import UserConfigModal from "../control/UserConfigModal.js"

import { logOut } from "../../actions/users.js"
import { API_ROOT } from "../../constants"

class NavBar extends Component {
	componentDidUpdate(prevProps, prevState) {
	}

	handleLogOut = () => {
		this.props.logOut();
		localStorage.removeItem("token")
		localStorage.removeItem("userId")
    
    // this.props.history.push("/");
	}

	render() {
		return (
			<div id="nav-wrapper">
				<div className="menu-options">											
					<Link className="nav-link section-nav-link" style={{"margin-right": "10px"}} to="/" >Home</Link>
					<a className="nav-link" href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank">Extension</a>
					{this.props.user && this.props.discussion ? <Link className="nav-link section-nav-link" to={`/groups/Feed/discussions/${this.props.discussion.slug}-${this.props.discussion.id}`} >Guide</Link> : null}
					
				</div>

				<div className="profile-options">
					{ 
						this.props.userName 
						? 
							<div className="dropdown">
								<div className="nav-link user-dropdown">{this.props.userName}</div>
								<div className="dropdown-content">
									<Link to={`/profiles/${this.props.user.id}`}><div className="nav-link dropdown-item">View Profile</div></Link>
								  <Popup trigger={<div className="nav-link dropdown-item">Edit Profile</div>} position="right center" modal>
								    { close => <UserConfigModal user={this.props.user} closeModal={() => close()} /> }
								  </Popup>												  
									<div className="nav-link dropdown-item" onClick={this.handleLogOut}><Link to="/">Logout</Link></div>
								</div>
							</div>
						: 
							<div>
								<Link className="nav-link" to="/login" style={{"margin-right": "10px"}}>Login</Link>
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
	}
}

export default connect(mapStateToProps, { logOut })(NavBar);




