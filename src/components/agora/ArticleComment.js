import React, { Component } from 'react';
import { connect } from "react-redux"

class ArticleComment extends Component {
	createContent = () => {
		let parser = new DOMParser();
		let doc = parser.parseFromString(this.props.content, "text/html")
		let pCollection = doc.getElementsByTagName("p")
		let pArray	= Array.from(pCollection)
		// debugger
		let pTextArray = pArray.map(p => <p>{p.innerText}</p>)
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


export default connect(state => ({content: state.discussion.discussion.article.content}))(ArticleComment);