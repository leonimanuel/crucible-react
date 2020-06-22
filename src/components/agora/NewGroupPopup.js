import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchUsers } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"

import Example from "./Example.js"
import Autosuggest from 'react-autosuggest';
import MemberSuggestion from "./MemberSuggestion.js"
import MemberTag from "./MemberTag.js"

// Imagine you have a list of languages that you'd like to autosuggest.

class newGroupPopup extends Component {
	state = {
		articleURL: "",
		groupName: "",
		memberSearchVal: "",
		addedMembers: []
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
		  placement: 'right',
		});		
	}

	renderSuggestions = () => {
		return this.props.suggestionMembers.map(member => {
			return (
				<MemberSuggestion member={member} addToMemberBox={this.addToMemberBox} />
			) 
		})
	}

	addToMemberBox = (member) => {
		this.setState({
			...this.state, 
			addedMembers: [...this.state.addedMembers, member],
			memberSearchVal: ""
		})
	}

	removeMember = (member) => {
		debugger
		this.setState({
			...this.state,
			addedMembers: this.state.addedMembers.filter(mem => mem.id !== member.id)
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
	}

	render() {
		debugger
		if (document.getElementById("add-member-input")) {
			let inputField = document.getElementById("add-member-input");
			let suggestionsBox = document.getElementById("suggestions-box")

			suggestionsBox.style = `width: ${inputField.clientWidth + 5}px`
		}
		return (
			<div id="new-group-popup">
				<div id="new-group-popup-title">New Group</div>
				<form id="new-group-form" onSubmit={this.handleSubmit}>
					<div className="new-group-input-div"><label>Article link: </label><input type="text"/> <br/></div>
					<div className="new-group-input-div">Members: <input id="add-member-input" type="text" onChange={this.handleChange} value={this.state.memberSearchVal} autocomplete="off" /></div>
					
					<div id="suggestions-box">
						{this.props.suggestionMembers.length > 0 && this.state.memberSearchVal ? this.renderSuggestions() : null}
					</div>

					<div id="added-member-box">
						{this.state.addedMembers.map(member => <MemberTag removeMember={this.removeMember} member={member} />)}
					</div>
					<div className="new-group-input-div">Group Name (optional): <input type="text" /></div>
					<input type="submit" value="Create Group"/>
				</form>
			</div>
		)
	}
}


export default connect(state => ({suggestionMembers: state.sidenav.members}), { fetchUsers })(newGroupPopup);




