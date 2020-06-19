import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchUsers } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"

import Example from "./Example.js"
import Autosuggest from 'react-autosuggest';
import MemberSuggestion from "./MemberSuggestion.js"
// Imagine you have a list of languages that you'd like to autosuggest.

class newGroupPopup extends Component {
	state = {
		articleURL: "",
		groupName: "",
		memberSearchVal: ""
	}

	

	handleChange = (e) => {
		// debugger
		this.setState({
			...this.state,
			memberSearchVal: e.target.value
		})

		if (e.target.value) {
			this.props.fetchUsers(e.target.value)
		} 
	}

	handleFocus = (e) => {
		e.preventDefault();
		let button = document.querySelector("#add-member-input");
		let popup = document.querySelector("#suggestions-popup")
		popup.style = `width: ${button.clientWidth}px`
		createPopper(button, popup, {
		  placement: 'bottom',
		});		
	}

	renderSuggestions = () => {
		return this.props.suggestionMembers.map(member => <MemberSuggestion member={member} />)
	}

	render() {
		// debugger
		return (
			<div id="new-group-popup">
				<div id="new-group-popup-title">New Group</div>
				<form id="new-group-form">
					Article link: <input type="text"/> <br/>
					Members: <input id="add-member-input" type="text" onFocus={this.handleFocus} onChange={this.handleChange} value={this.state.memberSearchVal} autocomplete="off" />
					<div id="added-member-box"></div>
					Group Name (optional): <input type="text" />
					<input type="submit" value="Create Group"/>
				</form>
				<div id="suggestions-popup" className="popup">
					{this.props.suggestionMembers.length > 0 ? this.renderSuggestions() : null}
				</div>
			</div>
		)
	}
}


export default connect(state => ({suggestionMembers: state.sidenav.members}), { fetchUsers })(newGroupPopup);




