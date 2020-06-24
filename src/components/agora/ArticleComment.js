import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"

class ArticleComment extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact}))
	}

	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		this.props.addFactFromComment(fact);
	}

	render() {
		debugger
		const { match } = this.props;
		return (
			<div id={this.props.id} className="popup">
				<div className="comment-fact">
					<div className="comment-user-name">{this.props.comment.user.name}</div>
				</div>
				<div className="comment-fact">
					<div className="comment-content"></div>{this.props.comment.content}
				</div>
				
				{this.props.comment.facts ? this.props.comment.facts.map(fact => {
					return (
						<div className="comment-fact-wrapper">
							<div>{fact.content}</div>
							<button 
								className="add-comment-fact-button" 
								onClick={() => this.handleAddFact(fact)}
							>+</button>
						</div>
					) 
				}) : null}
			</div>
		)
	}
}


export default connect(null, { addFactFromComment })(ArticleComment);



