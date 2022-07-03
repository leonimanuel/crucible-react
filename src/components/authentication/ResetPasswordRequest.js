// import React, { Component } from 'react';
import React, { useState, useEffect } from "react"
import { logIn } from "../../actions/users.js"
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { API_ROOT } from "../../constants"
import FormWrapper from "../tools/FormWrapper.js"
import "./auth.scss"

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

function Login(props) {
  const [stateEmail, setStateEmail] = useState("");

  const handleChange = e => {
    if (e.target.name == "email") { setStateEmail(e.target.value) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
  }

  return (
    <FormWrapper>
      <h1 className="auth-header form-header">reset password</h1>
      
      <div className="auth-form-and-options form-fields-and-options">
        <form className="auth-form form-content-wrapper" onSubmit={handleSubmit}>
          <div className="auth-item form-field">
            <label className="form-label auth-form-label">Email </label>
            <input className="form-input auth-input" type="email" name="email" onChange={handleChange} value={stateEmail} required/>                    
          </div>

          <button id='back-to-login-button' className="auth-option form-option"><Link to="/login">back to login</Link></button>

          <input className="auth-button form-action-button" type="submit" value="send reset link"/>
        </form>
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







