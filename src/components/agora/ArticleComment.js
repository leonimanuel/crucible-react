import React, { Component } from 'react';

class ArticleComment extends Component {
	render() {
		// debugger
		const { match } = this.props;
		return (
			<div id={this.props.id}>
				Hey there baby
			</div>
		)
	}
}


export default ArticleComment;