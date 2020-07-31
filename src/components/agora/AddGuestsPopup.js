// NOT USED!!!

import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchUsers } from "../../actions/groups.js"
import { addGuests } from "../../actions/discussionsActions.js"
import { createPopper } from "@popperjs/core"

// import Example from "./Example.js"
// import Autosuggest from 'react-autosuggest';
import MemberSuggestion from "./MemberSuggestion.js"
import MemberTag from "./MemberTag.js"

// Imagine you have a list of languages that you'd like to autosuggest.

class AddGuestsPopup extends Component {
	state = {
		// articleURL: "",
		// groupName: "",
		memberSearchVal: "",
		addedMembers: [],
	}
	
	handleChange = (e) => {
		// debugger
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})

		if (e.target.value) {
			this.props.fetchUsers(e.target.value, [...this.props.members, ...this.props.guests])
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
		// debugger
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
		// debugger
		this.setState({
			...this.state,
			addedMembers: this.state.addedMembers.filter(mem => mem.id !== member.id)
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		debugger
		if (this.state.addedMembers.length) {
			this.props.addGuests(this.props.discussion, this.state.addedMembers)
			this.props.closePopup()
		}
		
	}

	render() {
		// debugger
		if (document.getElementById("add-member-input")) {
			let inputField = document.getElementById("add-member-input");
			let suggestionsBox = document.getElementById("suggestions-box")

			suggestionsBox.style = `width: ${inputField.clientWidth + 5}px`
		}

		let opts = {}
		if (!this.state.addedMembers.length) {
			opts["disabled"] = "disabled";
		}

		return (
			<div id="add-guests-popup" className="popup">
				<span id="new-group-close-button" className="close-button" onClick={this.props.closePopup}>X</span>
				<div id="new-group-popup-title">Add Guests</div>
				<form id="new-group-form" onSubmit={this.handleSubmit}>
					<div className="new-group-input-div">Guest: <input id="add-member-input" type="text" name="memberSearchVal" onChange={this.handleChange} value={this.state.memberSearchVal} autoComplete="off" /></div>
					
					<div id="suggestions-box">
						{this.props.suggestionMembers.length > 0 && this.state.memberSearchVal ? this.renderSuggestions() : null}
					</div>

					<div id="added-member-box">
						{this.state.addedMembers.map(member => <MemberTag removeMember={this.removeMember} member={member} />)}
					</div>
					<input type="submit" value="Add Guest" {...opts}
					/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		suggestionMembers: state.groups.memberSuggestions,
	}
}

export default connect(mapStateToProps, { fetchUsers, addGuests })(AddGuestsPopup);




