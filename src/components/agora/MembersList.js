import React, { Component } from "react";
import MemberListItem from "./MemberListItem.js"

class MembersList extends Component {
	render() {
		return (
			<div id="members-list" className="sidenav-list">
				<div className="list-title">Members</div>
				{this.props.members.map(member => <MemberListItem key={member.id} name={member.name} />)}
			</div>
		)
	}
}



export default MembersList;