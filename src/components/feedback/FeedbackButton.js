import React, { Component } from "react"
import "./feedback.css"
import { createPopper } from "@popperjs/core"

import FeedbackIcon from "./feedback-icon.png"
import FeedbackForm from "./FeedbackForm.js"
import { API_ROOT } from "../../constants"

class FeedbackButton extends Component {
	state = {
		renderFeedbackForm: false
	}

	toggleFeedbackForm = () => {		
		this.setState({renderFeedbackForm: !this.state.renderFeedbackForm}, () => {
			let button = document.querySelector("#feedback-button");
			let popup = document.querySelector("#feedback-form-popup")
			createPopper(button, popup, {
			  placement: 'right',
			});					
		})
	}

	submitFeedback = (feedback) => {
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			},
			body: JSON.stringify({
				feedback: feedback
			})
		}

		fetch(API_ROOT + "/feedback", configObj)
			.then(resp => resp.json())
			.then(data => {
				let popup = document.getElementById("feedback-form-popup");
				popup.innerHTML = `<div style="background-color: #96bb7c; padding: 5px;">${data.message}</div>` 
				setTimeout(() => {
					this.setState({renderFeedbackForm: false})
				}, 1000)
			})		
	}

	render() {
		// if (this.state.renderFeedbackForm === true) {
			
		// }
		return(
			<React.Fragment>
				{this.state.renderFeedbackForm ? <FeedbackForm handleFeedback={this.submitFeedback} /> : null}
				<div id="feedback-button" onClick={this.toggleFeedbackForm}>
					<img id="feedback-icon" src={FeedbackIcon} alt="feedback-icon"/>
				</div>
			</React.Fragment>
		)
	}
}


export default FeedbackButton;