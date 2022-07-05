import React, { Component } from "react"
import "./feedback.css"
// import { createPopper } from "@popperjs/core"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import FeedbackIcon from "./feedback-icon.png"
import FeedbackForm from "./FeedbackForm.js"
import { API_ROOT } from "../../constants"

class FeedbackButton extends Component {
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

			})		
	}

	render() {
		return(
			<React.Fragment>
			  <Popup 
			  	trigger={
						<div id="feedback-button">
							<img id="feedback-icon" src={FeedbackIcon} alt="feedback-icon"/>
						</div>
			  	} 
			  	position="center" 
			  	modal
		  	>
		    	{ close => <FeedbackForm 
		    			handleGroupAdded={() => close()}
		    			closePopup={() => close()} 
		    		/> 
		    	}
			  </Popup>					
			</React.Fragment>
		)
	}
}


export default FeedbackButton;



















