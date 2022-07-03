import React, { Component } from "react";
import { API_ROOT } from "../../constants"
import { logIn } from "../../actions/users.js"
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom";
// import { confirmEmail } from "../../actions/users.js"
import FormWrapper from "../tools/FormWrapper.js"

class ConfirmEmail extends Component {
	state = {
		confirmed: false
	}

	componentDidMount = async () => {
    const token = this.props.match.params.token
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }

    try {
      let response = await fetch(API_ROOT + `/confirm-email/${token}`, configObj)
      if (response.status == 200) {
        this.setState({confirmed: true});

      } else if (response.status == 401) {
        alert("unable to authenticate user")
      }
    } catch (error) {
      alert(error)
    }
	}

	render() {
		return (
			<FormWrapper>
				<div>CONFIRMING EMAIL</div>
				{this.state.confirmed ? <Redirect to="/login"/> : null}
			</FormWrapper>
		)
	}
}

export default connect(null, { logIn })(ConfirmEmail);