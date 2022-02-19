import React, { Component } from "react";
import { API_ROOT } from "../../constants"
import { logIn } from "../../actions/users.js"
import { connect } from "react-redux"
// import { confirmEmail } from "../../actions/users.js"

class ConfirmEmail extends Component {
	state = {
		confirmation: "pending"
	}

	componentDidMount = async () => {
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

    try {
      let response = await fetch(API_ROOT + `/confirm-email/${token}`, configObj)
      if (response.status == 200) {
        this.setState({confirmation: "success"});
        this.props.logIn()
      }
    } catch (error) {
      alert(error)
    }
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