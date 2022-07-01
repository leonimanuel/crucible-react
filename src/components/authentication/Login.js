// import React, { Component } from 'react';
import React, { useState, useEffect } from "react"
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { API_ROOT } from "../../constants"
import "./auth.scss"

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

function Login(props) {
	const [stateEmail, setStateEmail] = useState("");
	const [statePassword, setStatePassword] = useState("");
	const [stateConfirmationResent, setStateConfirmationResent] = useState(false);
	const [stateForgotPassword, setStateForgotPassword] = useState(false);

	// state = {
	// 	email: "",
	// 	password: "",
	// 	confirmationResent: false,
	// 	forgotPassword: false
	// }

	const handleChange = e => {
		if (e.target.name == "email") { setStateEmail(e.target.value) }
		if (e.target.name == "password") { setStatePassword(e.target.value) }
		// this.setState({
		// 	[e.target.name]: e.target.value
		// }) 
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const errorBox = document.getElementById("error-box");
		errorBox.innerText = "";	
		e.preventDefault()
		console.log("submitting login info")
		
		// let rootURL = "http://localhost:3000"

		if (stateForgotPassword) {
			let configObj = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					email: stateEmail,
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
					email: stateEmail,
					password: statePassword
				})
			}
			
			try {
				let response = await fetch(API_ROOT + "/authenticate", configObj)
				// debugger
				if (response.status == 200) {
					let data = await response.json()
					const loginWrapper = document.getElementById("login-wrapper");
					loginWrapper.innerText = "successfully logged in!"
					localStorage.setItem("token", data.auth_token);		
					localStorage.setItem("userId", data.user.id);
					localStorage.setItem("userEmail", data.user.email);
          props.logIn()


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

	const resendConfirmation = async () => {
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
	  	}
	  } catch (error) {
	  	alert(error)
	  }
	}

	const forgotPassword = () => {
		setStateForgotPassword(true)
		// this.setState({forgotPassword: true})
	}

	// render() {
		if (props.isLoggedIn === true) { return <Redirect to="/"/> }
		// return (
	 //    <MDBContainer>
	 //      <MDBRow>
	 //        <MDBCol md="6">
	 //          <form>
	 //            <p className="h4 text-center mb-4">Sign in</p>
	 //            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
	 //              Your email
	 //            </label>
	 //            <input
	 //              type="email"
	 //              id="defaultFormLoginEmailEx"
	 //              className="form-control"
	 //            />
	 //            <br />
	 //            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
	 //              Your password
	 //            </label>
	 //            <input
	 //              type="password"
	 //              id="defaultFormLoginPasswordEx"
	 //              className="form-control"
	 //            />
	 //            <div className="text-center mt-4">
	 //              <MDBBtn color="indigo" type="submit">
	 //                Login
	 //              </MDBBtn>
	 //            </div>
	 //          </form>
	 //        </MDBCol>
	 //      </MDBRow>
	 //    </MDBContainer>
		// )

		return (
				<div id="login-wrapper" className="auth-wrapper">
					<h1 className="auth-header">{stateForgotPassword ? "reset password" : "Login"}</h1>
					
					<div id="auth-form-and-options">
						<form className="auth-form" onSubmit={handleSubmit}>
							<div className="auth-item">
								<label className="form-label auth-form-label">Email </label>
								<input className="form-input auth-input" type="email" name="email" onChange={handleChange} value={stateEmail} required/>										
							</div>

							{stateForgotPassword ? null :
								<div className="auth-item">
									<label className="form-label auth-form-label">Password </label>
									<input className="form-input auth-input" type="password" name="password" onChange={handleChange} value={statePassword} required/>										
								</div>
							}
							{!stateForgotPassword ? <button id='forgot-password-button' onClick={forgotPassword}>forgot password?</button> : <button onClick={() => setStateForgotPassword(false)}>back to login</button>}
							
							<div id="error-box" style={{color: "red"}}></div>
							<div id='resend-confirmation-button' onClick={resendConfirmation} style={{display: "none"}}>resend confirmation email</div>
							{stateForgotPassword ? <input className="auth-button" type="submit" value="send reset link"/> : <input className="auth-button" type="submit" value="Log in"/>}
						</form>

						<div id="sign-up-prompt">Don't have an account? <Link to="/signup">Sign up</Link></div>
					</div>
				</div>					
		)
	// }
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(Login);







