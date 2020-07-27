import React, { Component } from "react";
import { createPopper } from "@popperjs/core"

import MemberListItem from "./MemberListItem.js"
import AddListItemButton from "./AddListItemButton.js"
import NewMemberPopup from "./NewMemberPopup.js"

class MembersList extends Component {
	state = {
		renderNewMemberPopup: false
	}

	handleNewMember = () => {
		debugger		
		this.setState({
			renderNewMemberPopup: true
		}, () => {
			let button = document.querySelector("#new-group-button");
			let popup = document.querySelector("#new-group-popup")
			createPopper(button, popup, {
			  placement: 'right',
			  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
			});			
		})
	}

	closePopup = () => {
		this.setState({...this.state, renderNewMemberPopup: false})
	}

	render() {
		return (
			<div id="members-list" className="sidenav-list">
				<div className="list-title-wrapper" id="members-list-title-wrapper">
					<div className="list-title">Members</div>
					{/*this.props.admin ? <AddListItemButton id="new-member-button" buttonAction={this.handleNewMember}/> : null*/}
				</div>

				{this.props.members.map(member => <MemberListItem key={member.id} name={member.name} />)}

				{this.state.renderNewMemberPopup ? <NewMemberPopup closePopup={this.closePopup} /> : null}
			</div>
		)
	}
}



export default MembersList;