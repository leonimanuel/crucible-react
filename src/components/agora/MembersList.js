import React, { Component } from "react";
import { createPopper } from "@popperjs/core"

import MemberListItem from "./MemberListItem.js"
import AddListItemButton from "./AddListItemButton.js"

class MembersList extends Component {
	render() {
		return (
			<div id="members-list" className="sidenav-list">
				<div className="list-title-wrapper" id="members-list-title-wrapper">
					<div className="list-title">Members</div>
					{/*this.props.admin ? <AddListItemButton id="new-member-button" buttonAction={this.handleNewMember}/> : null*/}
				</div>

				{this.props.members.map(member => <MemberListItem key={member.id} name={member.name} />)}
			</div>
		)
	}
}



export default MembersList;

