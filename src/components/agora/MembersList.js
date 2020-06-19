import React, { Component } from "react";


class MembersList extends Component {
	render() {
		return (
			<div id="members-list">
				<h3>Members</h3>
				{this.props.members.map(member => <div>{member.name}</div>)}
			</div>
		)
	}
}



export default MembersList;