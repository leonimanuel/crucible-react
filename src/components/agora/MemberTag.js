import React, { Component } from "react";

class MemberTag extends Component {
	render() {
		return (
			<div className="member-tag">
				{this.props.member.name}
				<div className="remove-member-button" onClick={() => this.props.removeMember(this.props.member)}>   X</div>
			</div>
		)
	}
}


export default MemberTag;