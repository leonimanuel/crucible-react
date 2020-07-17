import React, { Component } from 'react';
// import { connect } from "react-redux"

class FactDetailsPane extends Component {
	render() {
		return (
			<div className="fact-details-pane">
				<div>Logic upvotes: {this.props.fact.logic_upvotes}</div>
				<div>Logic downvotes: {this.props.fact.logic_downvotes}</div>
				<div>Context upvotes: {this.props.fact.context_upvotes}</div>
				<div>Context downvotes: {this.props.fact.context_downvotes}</div>
				<div>Credibility upvotes: {this.props.fact.credibility_upvotes}</div>
				<div>Credibility downvotes: {this.props.fact.credibility_downvotes}</div>
			</div>
		)
	}
}


export default FactDetailsPane;




