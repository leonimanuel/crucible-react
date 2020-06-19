import React, { Component } from "react";

class MemberListItem extends Component {
	render() {
		return (
			<div id="member-list-item">{this.props.name}</div>
		)		
	}
}


export default MemberListItem