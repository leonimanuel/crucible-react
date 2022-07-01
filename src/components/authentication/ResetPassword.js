import React, { Component } from "react";
import { API_ROOT } from "../../constants"
import { logIn } from "../../actions/users.js"
import { connect } from "react-redux"

import { Redirect, Link } from "react-router-dom";
// import { confirmEmail } from "../../actions/users.js"

class ResetPassword extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    resetSuccess: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }

	handleSubmit = async (e) => {
    e.preventDefault()
    const token = this.props.match.params.token
    if (this.state.password !== this.state.confirmPassword) {
      alert("passwords must match")
    } else {
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        }, 
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })      
      }

      try {
        let response = await fetch(API_ROOT + `/reset-password/${token}`, configObj)
        if (response.status == 200) {
          let data = await response.json()
          localStorage.setItem("token", data.auth_token)
          this.setState({resetSuccess: true})
          this.props.logIn()
        } else if (response.status == 404) {
          alert("no user found with this email address")
        } else if (response.status == 401) {
          alert("the email address does not match the reset link")
        }
      } catch (error) {
        alert(error)
      }
    }
	}

	render() {
		return (
			<div className="reset-password-container auth-wrapper">
        {!this.state.resetSuccess ?
          <React.Fragment>
            <h1 className="auth-header">reset your password</h1>
            
            <div id="auth-form-and-options">
              <form className="auth-form" onSubmit={this.handleSubmit}>
                <div className="auth-item">
                  <label className="form-label auth-form-label">Email </label>
                  <input className="form-input auth-input" type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>                    
                </div>

                <div className="auth-item">
                  <label className="form-label auth-form-label">Password </label>
                  <input className="form-input auth-input" type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>                   
                </div>

                <div className="auth-item">
                  <label className="form-label auth-form-label">Confirm Password </label>
                  <input className="form-input auth-input" type="password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} required/>                   
                </div>
                
                <div id="error-box" style={{color: "red"}}></div>
                {<input className="auth-button" type="submit" value="reset password"/>}
              </form>  
            </div>            
          </React.Fragment>
          :
          <Redirect to="/"></Redirect>
        }
			</div>
		)
	}
}

export default connect(null, { logIn })(ResetPassword);