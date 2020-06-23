import React, { Component } from 'react';

class NewCommentFact extends Component {
	render() {
		// debugger
		// const { match } = this.props;
		return (
			<div id={`new-fact-${this.props.fact.id}`} className="new-comment-fact">
				{this.props.fact.content}
			</div>
		)
	}
}


export default NewCommentFact;