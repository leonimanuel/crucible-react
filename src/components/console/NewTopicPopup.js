import React, { Component } from 'react';
// import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { addNewTopic } from "../../actions/topicsActions.js"
import FormWrapper from "../tools/FormWrapper.js"

class NewTopicPopup extends Component {
	state = {
		topicName: ""
	}

	handleChange = (e) => {
		this.setState({
			...this.state, 
			topicName: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addNewTopic(
			this.props.parentId,
			this.state.topicName,
			this.props.closePopup
		)
	}

	render() {
		let opts = {}
		if (!this.state.topicName) {
			opts["disabled"] = "disabled";
		}

		return (
			<FormWrapper>
				<button id="new-topic-close-button" className="close-button" onClick={this.props.closePopup}>X</button>				
				<h1 className="auth-header form-header">New Topic</h1>
				<div className="auth-form-and-options form-fields-and-options">
					<form className="form-content-wrapper" onSubmit={this.handleSubmit}>
						<div className="form-field">
							<label className="form-label">Topic Name</label>
							<input className="form-input" type="text" name="topicName" onChange={this.handleChange} value={this.state.topicName} required maxlength="30"/>										
						</div>
						<input className="form-action-button" type="submit" value="Create Topic" {...opts} />
					</form>
				</div>
			</FormWrapper>
		)
	}
}


export default connect(null, { addNewTopic })(NewTopicPopup);




