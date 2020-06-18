import React, { Component } from 'react';

class ArticleComment extends Component {
	render() {
		// debugger
		const { match } = this.props;
		return (
			<div id={this.props.id}>
				{this.props.comment.content}
			</div>
		)
	}
}


export default ArticleComment;