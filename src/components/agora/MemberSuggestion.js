import React, { Component } from 'react';
// import { connect } from "react-redux"

class MemberSuggestion extends Component {
	state = {
		hoveredOver: false
	}

	handleMouseOver = () => {
		this.setState({...this.state, hoveredOver: true})
	}

	hanldeMouseLeave = () => {
		this.setState({...this.state, hoveredOver: false})
	}

	handleClick = () => {
		this.props.addToMemberBox(this.props.member)
	}

	render() {
		return (
			<div className={`member-suggestion ${this.state.hoveredOver ? "highlight" : ""}`}
				onMouseEnter={this.handleMouseOver} 
				onMouseLeave={this.hanldeMouseLeave} 
				onClick={this.handleClick} >
				<div className="suggestion-name {}">{this.props.member.name}</div>
				<div className="suggestion-email">{this.props.member.email}</div>
			</div>
		)
	}
}

export default MemberSuggestion;




