import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../../constants"

class SignUp extends Component {
	state = {
		name: "Charlie",
		lastName: "Barley",
		handle: "chakabaka",
		email: "billy@aol.com",
		password: "greenbeans"
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = e => {
		e.preventDefault()
		console.log("submitting login info")
		
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
				debugger
				if (data.auth_token) {
					console.log(data)					
					localStorage.setItem("token", data.auth_token)
					this.props.logIn(data.user)
				} 
				else if (data.error) {
					debugger
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
					<h1>Sign Up</h1>
					<form id="sign-up-form" onSubmit={this.handleSubmit}>
						<label>First Name: </label>
						<input type="text" name="name" onChange={this.handleChange} value={this.state.name} required/>
						<br/>
						<label>Last Name: </label>
						<input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} required/>
						<br/>
						<label>Handle: </label>
						<input type="text" name="handle" onChange={this.handleChange} value={this.state.handle} required/>
						<br/>						
						<label>Email: </label>
						<input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>
						<br/>
						<label>Password: </label>
						<input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>
						<br/>
						<div id="error-box" style={{color: "red"}}></div>
						<input type="submit" value="Sign up"/>
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

export default connect(mapStateToProps, { logIn })(SignUp);







