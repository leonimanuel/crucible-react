import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../../constants"

class SignUp extends Component {
	state = {
		name: "",
		lastName: "",
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

	handleSubmit = e => {
		e.preventDefault()
		console.log("submitting login info")
		let errorBox = document.getElementById("handle-error-box")
		if (this.state.handle.match(/\W/)) {
			errorBox.innerText = "handle should only include letters, numbers, or underscores"
			return 
		} else {
			errorBox.innerText = ""
		}
		debugger
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				name: this.state.name,
				lastName: this.state.lastName,
				handle: this.state.handle,
				email: this.state.email,
				password: this.state.password
			})
		}

		fetch(API_ROOT + "/users", configObj)
			.then(resp => resp.json())
			.then(data => {
				if (data.message) {
					localStorage.setItem("token", data.auth_token)
					debugger
					this.setState({submitted: "success"})
				} 
				else if (data.error) {
					const errorBox = document.getElementById("error-box");
					errorBox.innerText = data.error;
				}
				else {
					alert(data.error.user_authentication)
				}
			})
			.catch(err => alert(err.message))
	}

	render() {
		if (this.props.isLoggedIn === true) { return <Redirect to="/"/> }
		return (
				<div id="login-wrapper" className="auth-wrapper">
					{!this.state.submitted 
						? 
							<React.Fragment>
								<h1 className="auth-header">Sign Up</h1>
								<form className="auth-form" id="sign-up-form" onSubmit={this.handleSubmit}>
									<div>
										<label>First Name: </label>
										<input type="text" name="name" onChange={this.handleChange} value={this.state.name} required/>						
									</div>
									
									<div>
										<label>Last Name: </label>
										<input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} required/>										
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

									<div>
										<label>Password: </label>
										<input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>										
									</div>
									<div id="error-box" style={{color: "red"}}></div>
									<input className="auth-button" type="submit" value="Sign up"/>
								</form>
							</React.Fragment>
						:
							<div>Please check your email for a link to verify your account</div>
					}
				</div>					
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(SignUp);







