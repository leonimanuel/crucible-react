import React, { Component } from 'react';

class Login extends Component {
	state = {
		email: "",
		password: ""
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleSubmit = e => {
		e.preventDefault()
		console.log("submitting login info")
		let rootURL = "http://localhost:3000"
	}

	render() {
		return (
			<div id="login-wrapper">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Email: </label>
					<input type="email" name="email" onChange={this.handleChange} value={this.state.email}/>
					<input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
					<input type="submit" value="Log in"/>
				</form>
			</div>
		)
	}
}


export default Login;