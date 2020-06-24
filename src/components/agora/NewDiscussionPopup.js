import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { addNewDiscussion } from "../../actions/discussionsActions.js"

class NewDiscussionPopup extends Component {
	state = {
		articleURL: ""
	}

	handleChange = (e) => {
		debugger
		this.setState({
			...this.state, 
			articleURL: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		debugger
		this.props.addNewDiscussion(
			this.props.groupId,
			this.state.articleURL
		)
	}

	render() {
		return (
			<div id="new-discussion-popup" className="popup">
				<span id="new-group-close-button" className="close-button" onClick={this.props.closePopup}>X</span>				
				<form id="new-discussion-form" onSubmit={this.handleSubmit}>
					<div id="new-discussion-popup-title">New Discussion</div>
					<div>Article Link: <input type="url" name="articleURL" onChange={this.handleChange} value={this.state.articleURL} required/></div>
					<input type="submit" value="Create Discussion"/>
				</form>
			</div>
		)
	}
}


export default connect(null, { addNewDiscussion })(NewDiscussionPopup);




