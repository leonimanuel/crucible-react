import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import rootURL from "../../rootURL.js"

class Login extends Component {
	state = {
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

		fetch(rootURL() + "/authenticate", configObj)
			.then(resp => resp.json())
			.then(data => {
				if (data.auth_token) {
					console.log(data)					
					localStorage.setItem("token", data.auth_token)
					this.props.logIn(data)
				} else {
					alert(data.error.user_authentication)
				}
			})
			.catch(err => alert(err.message))
	}

	render() {
		if (this.props.isLoggedIn === true) { return <Redirect to="/"/> }
		return (
				<div id="login-wrapper">
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						<label>Email: </label>
						<input type="email" name="email" onChange={this.handleChange} value={this.state.email}/>
						<br/>
						<label>Password: </label>
						<input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
						<input type="submit" value="Log in"/>
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







