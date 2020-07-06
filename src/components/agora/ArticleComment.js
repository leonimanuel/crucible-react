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
		const { match } = this.props;
		debugger
		return (
			<div id={this.props.id} className="popup">
				<div className="comment-user-name">{this.props.userId === this.props.comment.user_id ? "You" : this.props.comment.user.name}</div>
				<div className="comment-content">{this.props.comment.content}</div>
				
				{this.props.comment.facts ? this.props.comment.facts.map(fact => {
					return (
						<div className="comment-fact-wrapper">
							{this.props.userId !== this.props.comment.user_id
								? 
									<button 
										className="add-comment-fact-button" 
										onClick={() => this.handleAddFact(fact)}
									>+</button>
								: 
									null
							}

							<div className="comment-fact">{fact.content}</div>
						</div>
					) 
				}) : null}
			</div>
		)
	}
}


export default connect(state => ({userId: state.users.userId}), { addFactFromComment })(ArticleComment);



