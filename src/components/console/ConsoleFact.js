import React, { Component } from 'react';
// import { connect } from "react-redux"

class ConsoleFact extends Component {
	render() {
		return (
			<div className="fact-box">{this.props.fact.content}</div>
		)
	}
}


export default ConsoleFact;




