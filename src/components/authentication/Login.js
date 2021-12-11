import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../../constants"
import "./auth.css"

class Login extends Component {
	state = {
		email: "",
		password: "",
		confirmationResent: false
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = e => {
		const errorBox = document.getElementById("error-box");
		errorBox.innerText = "";	
		e.preventDefault()
		console.log("submitting login info")
		
		// let rootURL = "http://localhost:3000"

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
		debugger
		fetch(API_ROOT + "/authenticate", configObj)
			.then(resp => resp.json())
			.then(data => {
				debugger
				if (data.message) {
					const loginWrapper = document.getElementById("login-wrapper");
					loginWrapper.innerHTML = data.message
					localStorage.setItem("token", data.auth_token)
				}
				else if (data.error === "confirm email") {
					const resendConfirmationButton =  document.getElementById("resend-confirmation-button");
					resendConfirmationButton.style.display = "block"
				}
				else if (data.error) {
					const errorBox = document.getElementById("error-box");
					errorBox.innerText = data.error.user_authentication;
				}
				else if (data) {
					console.log(data)					
					localStorage.setItem("token", data.auth_token)
					this.props.logIn(data.user)
				} 				
			})
			.catch(err => alert(err.message))
	}

	resendConfirmation = () => {
	  debugger
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
	  		const loginBox = document.getElementById("login-wrapper");
	  		debugger
	  		loginBox.innerHTML = <div>{data.message}</div>
	  	}) 		
	}

	render() {
		if (this.props.isLoggedIn === true) { return <Redirect to="/"/> }
		return (
				<div id="login-wrapper" className="auth-wrapper">
					<h1 className="auth-header">Login</h1>
					<form className="auth-form" onSubmit={this.handleSubmit}>
						<div>
							<label>Email: </label>
							<input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>										
						</div>

						<div>
							<label>Password: </label>
							<input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>										
						</div>
						
						<div id="error-box" style={{color: "red"}}></div>
						<button id='resend-confirmation-button' onClick={this.resendConfirmation} style={{display: "none"}}>resend confirmation email</button>
						<input className="auth-button" type="submit" value="Log in"/>
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







