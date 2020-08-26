import React, { Component } from 'react';

class NewCommentFact extends Component {
	render() {
		// const factBox = document.getElementById(`new-fact-${this.props.fact.id}`)
		let borderColor = "black"
		if (this.props.fact) {
			debugger
			if (this.props.fact.review_status === "pending") {
				borderColor = "#ff9234"
			} else if (this.props.fact.review_status === "pass") {
				borderColor = "green"
			} else if (this.props.fact.review_status === "fail") {
				borderColor = "red"
			}
		}
		return (
			<div id={`new-fact-${this.props.fact.id}`} className="new-comment-fact" style={{border: `2px solid ${borderColor}`}}>
				{this.props.fact.content}
			</div>
		)
	}
}


export default NewCommentFact;