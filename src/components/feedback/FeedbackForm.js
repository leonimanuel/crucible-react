import React, { Component } from "react"
import FormWrapper from "../tools/FormWrapper.js"

class FeedbackForm extends Component {
	state = {
		feedback: ""
	}

	handleChange = (e) => {
		this.setState({feedback: e.target.value})
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
					<form className="form-content-wrapper" onSubmit={() => this.props.handleFeedback(this.state.feedback)}>
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