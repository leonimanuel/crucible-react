import React, { Component } from "react"
import FormWrapper from "../tools/FormWrapper.js"
import { API_ROOT } from "../../constants"

class FeedbackForm extends Component {
	state = {
		feedback: ""
	}

	handleChange = (e) => {
		this.setState({feedback: e.target.value})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		console.log("submitting feedback")
		// let errorBox = document.getElementById("handle-error-box")
		// errorBox.innerText = ""

		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			},
			body: JSON.stringify({
				feedback: this.state.feedback
			})
		}

		try {
			let resp = await fetch(API_ROOT + "/feedback", configObj)
			if (resp.status == 201) {		
				this.props.closePopup()
			}
			else {
				alert("Can't submit right now, sorry about that. Please try again later or email us directly at leon@crucible-app.com")
			}
		}
		catch (error) {
			alert("Can't submit right now, sorry about that. Please try again later or email us directly at leon@crucible-app.com")
		}
	}


	render() {
		let opts = {}
		if (!this.state.feedback) {
			opts["disabled"] = "disabled";
		}		

		return(
			<FormWrapper>
				<h1 className="form-header">feedback</h1>
				<div className="form-fields-and-options">
					<form className="form-content-wrapper" onSubmit={this.handleSubmit}>
						<div className="form-field">
							<textarea 
								name="feedback" id="feedback-input" className="form-input" cols="50" rows="3" required
								onChange={this.handleChange} value={this.state.feedback}
								placeholder="Please submit any questions or comments here. Your message will be sent to the Crucible team as an email.">
							</textarea>
						</div>
						
						<div id="error-box" style={{color: "red"}}></div>
						
						<input className="form-action-button" type="submit" value="submit feedback" {...opts}/>
					</form>
				</div>			
			</FormWrapper>
		)
	}
}


export default FeedbackForm;