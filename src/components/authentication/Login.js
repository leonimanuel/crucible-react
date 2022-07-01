import React, { Component } from 'react';
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';
// import ScriptTag from 'react-script-tag';

import { API_ROOT } from "../../constants"
import "./auth.scss"
import "./auth2.scss"
// import "./css/util.css"
// import "./css/main.scss"

class Login extends Component {
	componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "../src/components/authentication/js/main.js";
    document.body.appendChild(script);
	}

	state = {
		email: "",
		password: "",
		confirmationResent: false,
		forgotPassword: false
	}

	handleChange = e => {
		debugger
		this.setState({
			[e.target.type]: e.target.value
		}) 
	}

	handleSubmit = async (e) => {
		debugger
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
					localStorage.setItem("token", data.auth_token);		
					localStorage.setItem("userId", data.user.id);
					localStorage.setItem("userEmail", data.user.email);
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

    const style = {
      margin: "15px 0"
    };

		return (
      <div className="login-container">
        <div className="title">
         Login
        </div>
        <FluidInput type="text" name="email" label="email" id="email" style={style} value={this.state.email} onChange={this.handleChange}/>
        <FluidInput type="password" name="password" label="password" id="password" style={style} value={this.state.password} onChange={this.handleChange}/>
        <Button buttonText="log in" buttonClass="login-button" onSubmit={this.handleSubmit} />
      </div>			
		)
	}
}


class FluidInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: ""
    };
  }
  focusField() {
    const { focused } = this.state;
    this.setState({
      focused: !focused
    });
  }
  handleChange(event) {
    const { target } = event;
    const { value } = target;
    this.setState({
      value: value
    });
  }
  render() {
    const { type, label, style, id } = this.props;
    const { focused } = this.state;
    const { value } = this.props
    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value != "") {
      inputClass += " fluid-input--open";
    }
    
    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          
          <input 
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={this.focusField.bind(this)}
            onBlur={this.focusField.bind(this)}
            onChange={this.props.onChange.bind(this)}
            autocomplete="off"
          />
          <label className="fluid-input-label" forHtml={id}>{label}</label>
          
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div className={`button ${this.props.buttonClass}`} onClick={this.props.onSubmit}>
        {this.props.buttonText}
      </div>
    );
  }
}


const mapStateToProps = state => {
	return {
		isLoggedIn: state.users.isLoggedIn
	}
}

export default connect(mapStateToProps, { logIn })(Login);







