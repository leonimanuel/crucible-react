import React, { Component } from "react"

class FeedbackForm extends Component {
	state = {
		feedback: ""
	}

	handleChange = (e) => {
		this.setState({feedback: e.target.value})
	}

	render() {
		return(
			<div id="feedback-form-popup">
				<textarea 
					name="feedback" id="feedback-input" cols="50" rows="3" 
					onChange={this.handleChange} value={this.state.feedback}
					placeholder="Please submit any questions or comments here. Your feedback will be sent to the Crucible team as an email.">
				</textarea>
				
				<button 
					id="submit-feedback" 
					onClick={() => this.props.handleFeedback(this.state.feedback)}
				>
					submit feedback
				</button>
			</div>
		)
	}
}


export default FeedbackForm;