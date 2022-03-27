import React, { Component } from 'react';
import { connect } from "react-redux"

import { updateUserProfile } from "../../actions/users.js"

class UserConfigModal extends Component {
	state = {
		id: "",
		name: "",
		handle: "",
		email: ""
	}

	componentDidMount() {
		this.setState({
			id: this.props.user.id,
			name: this.props.user.name,
			handle: this.props.user.handle,
			email: this.props.user.email
		})
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUserProfile(this.state, this.props.closeModal)
    // props.fetchMemberSearches(stateInput)
  }

  render() {
	  return (
			<div id="edit-user-modal" className="auth-wrapper">
				<React.Fragment>
					<h1 className="auth-header">Edit Profile</h1>
					<form className="auth-form" id="sign-up-form" onSubmit={this.handleSubmit}>
						<div>
							<label>First Name: </label>
							<input type="text" name="name" onChange={this.handleChange} value={this.state.name} required/>						
						</div>

						<div>
							<label>Handle: </label>
							<input type="text" name="handle" onChange={this.handleChange} value={this.state.handle} required/>
						</div>
						<div id="handle-error-box" style={{color: "red", "font-size": "0.8em", width: "80%"}}></div>										
						
						<div>
							<label>Email: </label>
							<input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>										
						</div>

						<div id="error-box" style={{color: "red"}}></div>
						<input className="auth-button" type="submit" value="Save"/>
					</form>
				</React.Fragment>
			</div>		
		)
  }
}

export default connect(null, { updateUserProfile })(UserConfigModal);
