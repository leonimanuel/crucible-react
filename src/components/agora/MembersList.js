import React, { Component } from "react";
import MemberListItem from "./MemberListItem.js"

class MembersList extends Component {
	render() {
		return (
			<div id="members-list">
				<h3>Members</h3>
				{this.props.members.map(member => <MemberListItem key={member.id} name={member.name} />)}
			</div>
		)
	}
}



export default MembersList;