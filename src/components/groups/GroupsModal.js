import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchUsers, addNewGroup } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"

// import Example from "./Example.js"
// import Autosuggest from 'react-autosuggest';
import MemberSuggestion from "./MemberSuggestion.js"
import MemberTag from "./MemberTag.js"
import FormWrapper from "../tools/FormWrapper.js"

// Imagine you have a list of languages that you'd like to autosuggest.

class GroupsModal extends Component {
	state = {
		// articleURL: "",
		groupName: "",
		memberSearchVal: "",
		addedMembers: [],
		groupNameError: "",
		isPrivate: true
	}

	handleChange = (e) => {
		// debugger
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		})

		if (e.target.name === "memberSearchVal" && e.target.value) {
			this.props.fetchUsers(e.target.value, [], this.state.addedMembers)
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

	handlePrivacyChange = (e) => {
		this.setState({isPrivate: !this.state.isPrivate})
		
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.groupName.toLowerCase() === "Feed".toLowerCase() || this.state.groupName.toLowerCase() === "Guest".toLowerCase()) {
			this.setState({groupNameError: "Group name can't be Feed or Guest"})
		}

		else if (this.state.groupName && this.state.addedMembers.length) {
			this.props.addNewGroup(this.state.groupName, this.state.addedMembers, this.state.isPrivate, this.props.closePopup)
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
		if (!this.state.groupName || !this.state.addedMembers.length) {
			opts["disabled"] = "disabled";
		}

		return (
			<FormWrapper>
				<span id="new-group-close-button" className="close-button" onClick={this.props.closePopup}>X</span>
				<h3 className="form-header">New Private Group</h3>
				<div className="form-fields-and-options">
					<form className="form-content-wrapper new-group" onSubmit={this.handleSubmit}>
						<div className="auth-item form-field">
							<label className="form-label">Group Name</label>
							<input className="form-input" type="text" name="groupName" onChange={this.handleChange} value={this.state.groupName} required maxlength="30"/>										
						</div>						
						<div style={{color: "red"}}>{this.state.groupNameError}</div>

						<div className="auth-item form-field">
							<label className="form-label">Members</label>
							<input className="form-input" type="text" name="memberSearchVal" onChange={this.handleChange} value={this.state.memberSearchVal} autoComplete="off"/>										
						
							<div id="member-suggestions-container">
								<div id="suggestions-box">
									{this.props.suggestionMembers.length > 0 && this.state.memberSearchVal ? this.renderSuggestions() : null}
								</div>
							</div>
						</div>	

						<div id="added-member-box">
							{this.state.addedMembers.map(member => <MemberTag removeMember={this.removeMember} member={member} />)}
						</div>
		
						<span className="form-option-description">Only members can view, post, and add more members.</span>

			      {/*<div onChange={this.handlePrivacyChange}>
							<div className="form-field form-radio-item">						
				        <input className="form-input" type="radio" value="public" name="privacy" checked={this.state.isPrivate === false}/>
				        <label className="form-label checkbox-label">Public</label>
			        </div>
			        <div className="form-field form-radio-item">
				        <input className="form-input" type="radio" value="private" name="privacy" checked={this.state.isPrivate === true}/>
				        <label className="form-label checkbox-label">Private</label>						
			        </div>									        
			      </div>*/}


			      <input className="form-action-button" type="submit" value="Create Group" {...opts}/>
					</form>				
				</div>
			</FormWrapper>
		)
	}
}


export default connect(state => ({suggestionMembers: state.groups.memberSuggestions}), { fetchUsers, addNewGroup })(GroupsModal);




