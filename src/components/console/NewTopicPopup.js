import React, { Component } from 'react';
// import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { addNewTopic } from "../../actions/topicsActions.js"

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
			this.state.topicName
		)
		this.props.closePopup()
	}

	render() {
		let opts = {}
		if (!this.state.topicName) {
			opts["disabled"] = "disabled";
		}

		return (
			<div id="new-topic-popup" className="popup">
				<span id="new-topic-close-button" className="close-button" onClick={this.props.closePopup}>X</span>				
				<form id="new-topic-form" onSubmit={this.handleSubmit}>
					<div id="new-topic-popup-title">New Topic</div>
					<div>Topic name: <input type="text" name="topicName" onChange={this.handleChange} value={this.state.topicName} required/></div>
					<br/>
					<input type="submit" value="Create Topic" {...opts} />
				</form>
			</div>
		)
	}
}


export default connect(null, { addNewTopic })(NewTopicPopup);




