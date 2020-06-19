import React, { Component } from 'react';
// import { connect } from "react-redux"

class MemberSuggestion extends Component {
	render() {
		return (
			<div className="member-suggestion">
				<div className="suggestion-name">{this.props.member.name}</div>
				<div className="suggestion-email">{this.props.member.email}</div>
			</div>
		)
	}
}


export default MemberSuggestion;




