import React, { Component } from "react";

class MemberTag extends Component {
	render() {
		return (
			<div className="member-tag">
				{this.props.member.name}
				<button className="remove-member-button remove-item-button" onClick={() => this.props.removeMember(this.props.member)}>✕</button>
			</div>
		)
	}
}


export default MemberTag;