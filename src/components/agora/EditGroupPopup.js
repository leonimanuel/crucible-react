import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchUsers, addNewGroup, editGroup } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"

import Example from "./Example.js"
import Autosuggest from 'react-autosuggest';
import MemberSuggestion from "./MemberSuggestion.js"
import MemberTag from "./MemberTag.js"

// Imagine you have a list of languages that you'd like to autosuggest.

class editGroupPopup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			groupName: props.group.name,
			memberSearchVal: "",
			currentMembers: this.props.members,
			addedMembers: [],
			removedMembers: []
		}		
	}


	handleChange = (e) => {
		// debugger
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})

		if (e.target.name === "memberSearchVal" && e.target.value) {
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
		// debugger
		return this.props.suggestionMembers.map(member => {
			return (
				<MemberSuggestion member={member} addToMemberBox={this.addToMemberBox} />
			) 
		})
	}

	addToMemberBox = (member) => {
		const { addedMembers, currentMembers, removedMembers } = this.state
		if (this.state.removedMembers.includes(member)) {
			this.setState({ removedMembers: [...removedMembers.filter(mem => mem.id !== member.id)] }) 
		} else {
			this.setState({
				...this.state, 
				addedMembers: [...addedMembers, member],
				currentMembers: [...currentMembers, member],
				memberSearchVal: ""
			})			
		}
	}

	removeMember = (member) => {
		const { addedMembers, currentMembers, removedMembers } = this.state
		if (this.state.addedMembers.includes(member)) {
			this.setState({ addedMembers: [...addedMembers.filter(mem => mem.id !== member.id)] }) 
		} else {
			this.setState({
				...this.state,
				removedMembers: [...removedMembers, member],
				currentMembers: [...currentMembers.filter(mem => mem.id !== member.id)]
			})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.groupName && this.state.currentMembers.length) {
			// this.props.addNewGroup(this.state.groupName, this.state.addedMembers)
			const { groupName, addedMembers, removedMembers } = this.state
			this.props.editGroup(this.props.group.id, groupName, addedMembers, removedMembers)
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
		if (!this.state.groupName || !this.state.currentMembers.length) {
			opts["disabled"] = "disabled";
		}

		return (
			<div id="edit-group-popup" className="popup">
				<span id="edit-group-close-button" className="close-button" onClick={this.props.closePopup}>X</span>
				<div id="edit-group-popup-title">Edit Group</div>
				<form id="edit-group-form" onSubmit={this.handleSubmit}>
					<div className="edit-group-input-div">Group Name: <input type="text" name="groupName" onChange={this.handleChange} value={this.state.groupName}/></div>
					<div className="edit-group-input-div">Members: <input id="add-member-input" type="text" name="memberSearchVal" onChange={this.handleChange} value={this.state.memberSearchVal} autoComplete="off" /></div>
					
					<div id="suggestions-box">
						{this.props.suggestionMembers.length > 0 && this.state.memberSearchVal ? this.renderSuggestions() : null}
					</div>

					<div id="added-member-box">
						{this.state.currentMembers.map(member => <MemberTag removeMember={this.removeMember} member={member} />)}
					</div>
					<input type="submit" value="Done" {...opts}
					/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		suggestionMembers: state.groups.memberSuggestions
	}
}

export default connect(mapStateToProps, { fetchUsers, addNewGroup, editGroup })(editGroupPopup);




