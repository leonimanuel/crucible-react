import React, { Component } from "react";
import { API_ROOT } from "../../constants"
import { logIn } from "../../actions/users.js"
import { connect } from "react-redux"
// import { confirmEmail } from "../../actions/users.js"

class ConfirmEmail extends Component {
	state = {
		confirmation: "pending"
	}

	componentDidMount() {
    debugger
    const token = this.props.match.params.token
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(API_ROOT + `/confirm-email/${token}`, configObj)
      .then(resp => resp.json)
      .then(data => {
        debugger
        this.setState({confirmation: "success"})
				this.props.logIn()
      })
      .catch(err => {
      	alert(err)
      })  
	}

	render() {
		return (
			<div className="auth-wrapper">
				<div>CONFIRMING EMAIL</div>
				{this.state.confirmation === "success" ? <div>Email confirmed. Logging in...</div> : null}				
			</div>
		)
	}
}

export default connect(null, { logIn })(ConfirmEmail);