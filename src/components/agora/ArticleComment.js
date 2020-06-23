import React, { Component } from 'react';

class ArticleComment extends Component {
	render() {
		debugger
		const { match } = this.props;
		return (
			<div id={this.props.id}>
				<div>
					{this.props.comment.user.name}
				</div>
				<div>
					{this.props.comment.content}
				</div>
				
				{this.props.comment.facts ? this.props.comment.facts.map(fact => <div>{fact.content}</div>) : null}
			</div>
		)
	}
}


export default ArticleComment;