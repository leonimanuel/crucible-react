import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../../constants"
import "./auth.scss"

class Login extends Component {
	state = {
		email: "",
		password: "",
		confirmationResent: false,
		forgotPassword: false
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const errorBox = document.getElementById("error-box");
		errorBox.innerText = "";	
		e.preventDefault()
		console.log("submitting login info")
		
		// let rootURL = "http://localhost:3000"

		if (this.state.forgotPassword) {
			let configObj = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					email: this.state.email,
				})
			}

			try {
				let response = await fetch(API_ROOT + "/reset-password-email", configObj)
				if (response.status == 200) {
					alert("reset link sent")
				} else if (response.status == 404) {
					alert("email not found")	
				}
			} catch (error) {
				alert(error)
			}						
		} else {
			let configObj = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			}
			
			try {
				let response = await fetch(API_ROOT + "/authenticate", configObj)
				// debugger
				if (response.status == 200) {
					let data = await response.json()
					const loginWrapper = document.getElementById("login-wrapper");
					loginWrapper.innerText = "successfully logged in!"
					localStorage.setItem("token", data.auth_token)				
          this.props.logIn()


				} else if (response.status == 403) {
						const resendConfirmationButton =  document.getElementById("resend-confirmation-button");
						resendConfirmationButton.style.display = "block"				
				}
				else if (response.status == 404) {
					alert("no account found with this email address")
				} 
			} catch (error) {
				alert(error)
			}			
		}

		// fetch(API_ROOT + "/authenticate", configObj)
		// 	.then(resp => {
		// 		resp.json();
		// 	})
		// 	.then(data => {
		// 		debugger
		// 		if (data.message) {
		// 			const loginWrapper = document.getElementById("login-wrapper");
		// 			loginWrapper.innerHTML = data.message
		// 			localStorage.setItem("token", data.auth_token)
		// 		}
		// 		else if (data.error === "confirm email") {
		// 			const resendConfirmationButton =  document.getElementById("resend-confirmation-button");
		// 			resendConfirmationButton.style.display = "block"
		// 		}
		// 		else if (data.error) {
		// 			const errorBox = document.getElementById("error-box");
		// 			errorBox.innerText = data.error.user_authentication;
		// 		}
		// 		else if (data) {
		// 			console.log(data)					
		// 			localStorage.setItem("token", data.auth_token)
		// 			this.props.logIn(data.user)
		// 		} 				
		// 	})
		// 	.catch(err => alert(err.message))
	}

	resendConfirmation = async () => {
	  let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  // debugger
	  try {
	  	let response = await fetch(API_ROOT + `/resend-confirmation-email`, configObj)
	  	if (response.status == 200 || 403) {
	  		const errorBox = document.getElementById("error-box");
	  		errorBox.innerText = "confirmation email sent"
	  		debugger
	  	}
	  } catch (error) {
	  	alert(error)
	  }
	}

	forgotPassword = () => {
		this.setState({forgotPassword: true})
	}

	render() {
		if (this.props.isLoggedIn === true) { return <Redirect to="/"/> }
		return (
				<div id="login-wrapper" className="auth-wrapper">
					<h1 className="auth-header">{this.state.forgotPassword ? "reset password" : "Login"}</h1>
					<form className="auth-form" onSubmit={this.handleSubmit}>
						<div>
							<label>Email: </label>
							<input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>										
						</div>

						{this.state.forgotPassword ? null :
							<div>
								<label>Password: </label>
								<input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>										
							</div>
						}
						
						<div id="error-box" style={{color: "red"}}></div>
						<div id='resend-confirmation-button' onClick={this.resendConfirmation} style={{display: "none"}}>resend confirmation email</div>
						{!this.state.forgotPassword ? <div id='forgot-password-button' onClick={this.forgotPassword}>forgot password?</div> : <div onClick={() => this.setState({forgotPassword: false})}>back to login</div>}
						{this.state.forgotPassword ? <input className="auth-button" type="submit" value="send reset link"/> : <input className="auth-button" type="submit" value="Log in"/>}
					</form>
				</div>					
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(Login);







