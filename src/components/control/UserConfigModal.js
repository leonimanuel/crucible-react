import React, { Component } from 'react';
import { connect } from "react-redux"

import { updateUserProfile } from "../../actions/users.js"

class UserConfigModal extends Component {
	state = {
		id: "",
		name: "",
		handle: "",
		email: "",
		email_tags: false,
		email_replies: false,
		email_group_add: false
	}

	componentDidMount() {
		this.setState({
			id: this.props.user.id,
			name: this.props.user.name,
			handle: this.props.user.handle,
			email: this.props.user.email,
			email_tags: this.props.user.settings.email_tags,
			email_replies: this.props.user.settings.email_replies,
			email_group_add: this.props.user.settings.email_group_add
		})
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleCheckboxChange = e => {
		this.setState({[e.target.name]: !this.state[e.target.name]})
	}

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateUserProfile(this.state, this.props.closeModal)
    // props.fetchMemberSearches(stateInput)
  }

  render() {
  	let { email_tags, email_replies, email_group_add } = this.state;

	  return (
			<div id="edit-user-modal" className="auth-wrapper">
				<h1 className="auth-header form-header">Edit Profile</h1>
				<div className="form-fields-and-options">
					<form className="auth-form form-content-wrapper" id="sign-up-form" onSubmit={this.handleSubmit}>
						<div className="auth-item form-field">
							<label className="form-label auth-form-label">Name: </label>
							<input className="form-input auth-input" type="text" name="name" onChange={this.handleChange} value={this.state.name} required maxlength="50"/>						
						</div>

						<div className="auth-item form-field">
							<label className="form-label auth-form-label">Handle: </label>
							<input className="form-input auth-input" type="text" name="handle" onChange={this.handleChange} value={this.state.handle} required maxlength="25"/>
						</div>
						<div id="handle-error-box" style={{color: "red", "font-size": "0.8em", width: "80%"}}></div>										
						
						<div className="auth-item form-field">
							<label className="form-label auth-form-label">Email: </label>
							<input className="form-input auth-input" type="email" name="email" onChange={this.handleChange} value={this.state.email} required maxlength="50"/>										
						</div>

						<h5 className="form-subheader">Email settings</h5>

						<div className="form-field form-checkbox-item">						
							<input className="form-input" type="checkbox" name="email_tags" checked={email_tags} onChange={() => this.setState({email_tags: !email_tags})}/>
							<label className="form-label auth-form-label checkbox-label">tag alerts</label>
						</div>

						<div className="form-field form-checkbox-item">						
							<input className="form-input" type="checkbox" name="email_replies" checked={email_replies} onChange={() => this.setState({email_replies: !email_replies})}/>
							<label className="form-label auth-form-label checkbox-label">reply alerts</label>
						</div>

						<div className="form-field form-checkbox-item">						
							<input className="form-input" type="checkbox" name="email_group_add" checked={email_group_add} onChange={() => this.setState({email_group_add: !email_group_add})}/>
							<label className="form-label auth-form-label checkbox-label">added to group alerts</label>
						</div>

						<div id="error-box" style={{color: "red"}}></div>
						<input className="auth-button form-action-button" type="submit" value="save"/>


						
					</form>
				</div>
			</div>		
		)
  }
}

export default connect(null, { updateUserProfile })(UserConfigModal);
