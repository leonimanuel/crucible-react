import React, { Component } from "react";

class MemberTag extends Component {
	render() {
		return (
			<div className="member-tag">
				{this.props.member.name}
			</div>
		)
	}
}


export default MemberTag;