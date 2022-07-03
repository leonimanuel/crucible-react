import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import FormWrapper from "../tools/FormWrapper.js"

import { API_ROOT } from "../../constants"

class SignUp extends Component {
	state = {
		name: "",
		handle: "",
		email: "",
		password: "",
		submitted: ""
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		console.log("submitting login info")
		let errorBox = document.getElementById("handle-error-box")
		if (this.state.handle.match(/\W/)) {
			errorBox.innerText = "handle should only include letters, numbers, or underscores"
		} else {
			errorBox.innerText = ""
			let configObj = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					name: this.state.name,
					handle: this.state.handle,
					email: this.state.email,
					password: this.state.password
				})
			}

			try {
				let resp = await fetch(API_ROOT + "/users", configObj)
				if (resp.status == 201) {
					let data = await resp.json();
					localStorage.setItem("token", data.auth_token)
					this.setState({submitted: "success"})					
				} 
				else if (resp.status == 422) {
					const errorBox = document.getElementById("error-box");
					let response = await resp.json();
					if (errorBox) { errorBox.innerText = response.errors.join('\r\n') }
					else {alert(response.errors.join('\r\n'))}
				}
			}
			catch (error) {
				alert(error)
			}
		}
	}

	resendConfirmation = () => {
	  let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  // debugger
	  fetch(API_ROOT + `/resend-confirmation-email`, configObj)
	  	.then(resp => resp.json())
	  	.then(data => {
	  		const confirmationMessage = document.getElementById("confirmation-sent-message");
	  		confirmationMessage.innerText = "confirmation email re-sent"
	  	}) 		
	}

	render() {
		if (this.props.isLoggedIn === true) { return <Redirect to="/"/> }
		return (
			<FormWrapper>
				{!this.state.submitted 
					? 
						<React.Fragment>
							<h1 className="auth-header form-header">Sign Up</h1>
							<div className="auth-form-and-options form-fields-and-options">
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

									<div className="auth-item form-field">
										<label className="form-label auth-form-label">Password: </label>
										<input className="form-input auth-input" type="password" name="password" onChange={this.handleChange} value={this.state.password} required maxlength="25"/>										
									</div>
									<div id="error-box" style={{color: "red"}}></div>
									<input className="auth-button form-action-button" type="submit" value="Sign up"/>
								</form>

								<div id="sign-up-prompt" className="form-option-description">Already have an account? <Link to="/login">Sign in</Link></div>									
							</div>
						</React.Fragment>
					:
						<React.Fragment>
							<div id="confirmation-sent-message">Please check your email for a link to verify your account</div>
							<button id='resend-confirmation-button' className="auth-button form-action-button" onClick={this.resendConfirmation}>resend confirmation email</button>
						</React.Fragment>
				}
			</FormWrapper>			
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(SignUp);







