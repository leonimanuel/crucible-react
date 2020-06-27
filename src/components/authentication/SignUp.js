import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../../constants"

class SignUp extends Component {
	state = {
		name: "Charlie",
		email: "charlie@aol.com",
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
				email: this.state.email,
				password: this.state.password
			})
		}

		fetch(API_ROOT + "/users", configObj)
			.then(resp => resp.json())
			.then(data => {
				if (data) {
					// debugger
					console.log(data)					
					localStorage.setItem("token", data.auth_token)
					this.props.logIn(data.user)
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
					<h1>Sign Up</h1>
					<form onSubmit={this.handleSubmit}>
						<label>Name: </label>
						<input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
						<br/>
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

export default connect(mapStateToProps, { logIn })(SignUp);







