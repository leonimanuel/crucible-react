import React, { Component } from 'react';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';

class ArticleContent extends Component {
	createContent = () => {
		let parser = new DOMParser();
		let doc = parser.parseFromString(this.props.discussion.article.content, "text/html")
		let pCollection = doc.getElementsByTagName("p")
		let pArray	= Array.from(pCollection)
		// debugger
		let pTextArray = pArray.map((p, index) => <p key={index} id={`p-${index + 1}`}>{p.innerText}</p>)
		return pTextArray
	}

	render() {
		return (
			<div id={this.props.id}>
				{this.createContent()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discussion: state.discussion.discussions.filter(d => d.id === state.discussion.discussionId)[0],
	}
}

export default connect(mapStateToProps)(ArticleContent);