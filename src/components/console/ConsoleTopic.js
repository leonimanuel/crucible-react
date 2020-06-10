import React, { Component } from 'react';
// import { connect } from "react-redux"

class ConsoleFact extends Component {
	render() {
		return (
			<div className="fact-box">{this.props.topic.name}</div>
		)
	}
}


export default ConsoleFact;




