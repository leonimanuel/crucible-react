import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"


class Article extends Component {
	componentDidMount() {
		this.props.fetchDiscussion(this.props.match.params.groupId, this.props.match.params.discussionId)
		
	}

	render() {
		debugger
		console.log(this.props.discussion)
		return (
			<div id="article-wrapper">
				{this.props.discussion ? 
					<div>
						<div id="article-title">{this.props.discussion.article.title}</div>
						<div id="article-content">{this.props.discussion.article.content}</div>						
					</div>
					: 
					<h3>Loading</h3>}
			</div>
		)
	}
}


export default connect(state => ({discussion: state.discussion.discussion}), { fetchDiscussion })(Article);

				// <h3>{this.props.discussion ?this.props.discussion.article.title : null}</h3>