// import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import React, { useState, useEffect } from "react"
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { API_ROOT, MIXPANEL_TOKEN } from "../../constants"
import useAnalyticsEventTracker from "../../actions/analyticsEventTracker.js"
import FormWrapper from "../tools/FormWrapper.js"
import "./auth.scss"

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

function Login(props) {
	const gaEventTracker = useAnalyticsEventTracker('engagement');	

	const [stateEmail, setStateEmail] = useState("");
	const [statePassword, setStatePassword] = useState("");
	const [stateConfirmationResent, setStateConfirmationResent] = useState(false);

	const handleChange = e => {
		if (e.target.name == "email") { setStateEmail(e.target.value) };
		if (e.target.name == "password") { setStatePassword(e.target.value) };
	}

	useEffect(() => {
		console.log("useEffect on Login.js");
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errorBox = document.getElementById("error-box");
		errorBox.innerText = "";	
		e.preventDefault();
		console.log("submitting login info")

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
			if (response.status == 200) {
				let data = await response.json()
				mixpanel.identify(data.user.id)

				localStorage.setItem("token", data.auth_token);		
				localStorage.setItem("userId", data.user.id);
				localStorage.setItem("userEmail", data.user.email);
        props.logIn()

        // gaEventTracker("login")
        // mixpanel.identify(`${data.user.id}`)
				// mixpanel.track('Log in', {
				//   'source': "web app"
				// });

		  //   window.dataLayer = window.dataLayer || [];
		  //   function gtag() {dataLayer.push(arguments);}
				// gtag("event", "login", {
				//   method: "Crucible"
				// });

			} else if (response.status == 401) {
					alert("email or password is invalid")		
			}	else if (response.status == 403) {
					const data = await response.json();
					localStorage.setItem("token", data.auth_token);	
					let answer = window.confirm("Please confirm your email to continue. Re-send confirmation email?")
					if (answer) {
						resendConfirmation()
					}
					// const resendConfirmationButton =  document.getElementById("resend-confirmation-button");
					// resendConfirmationButton.style.display = "block"				
			} else if (response.status == 404) {
					alert("email or password is invalid")
			} 
		} catch (error) {
			alert(error)
		}			
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
	  	if (response.status == 200) {
	  		const errorBox = document.getElementById("error-box");
	  		errorBox.innerText = "confirmation email sent"
	  	}
	  } catch (error) {
	  	alert(error)
	  }
	}

	if (props.isLoggedIn === true) { return <Redirect to="/"/> }

	let opts = {}
	if (!stateEmail || !statePassword) {
		opts["disabled"] = "disabled";
	}

	return (
		<FormWrapper>
			<h1 className="auth-header form-header">Login</h1>
			
			<div className="auth-form-and-options form-fields-and-options">
				<form className="auth-form form-content-wrapper" onSubmit={handleSubmit}>
					<div className="auth-item form-field">
						<label className="form-label auth-form-label">Email </label>
						<input className="form-input auth-input" type="email" name="email" onChange={handleChange} value={stateEmail} required/>										
					</div>

					<div className="auth-item form-field">
						<label className="form-label auth-form-label">Password </label>
						<input className="form-input auth-input" type="password" name="password" onChange={handleChange} value={statePassword} required/>										
					</div>
					
					<button id='reset-password-request-button' className="auth-option form-option"><Link to="/reset-password-request">forgot password?</Link></button>

					<div id="error-box" style={{color: "red"}}></div>
					{/*<div id='resend-confirmation-button' onClick={resendConfirmation} style={{display: "block"}}>resend confirmation email</div>*/}
					<input className="auth-button form-action-button" type="submit" value="Log in" {...opts}/>
				</form>

				<div id="sign-up-prompt" className="form-option-description">Don't have an account? <Link to="/signup">Sign up</Link></div>
			</div>
		</FormWrapper>				
	)
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(Login);







