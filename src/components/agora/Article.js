import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"

class Article extends Component {
	state = {
		location: ""	
	}

	componentDidMount() {
		this.props.fetchDiscussion(this.props.match.params.groupId, this.props.match.params.discussionId)
		this.setState({location: this.props.location.pathname})
	}

	componentDidUpdate() {
		if (this.props.location.pathname !== this.state.location) {
			this.props.fetchDiscussion(this.props.match.params.groupId, this.props.match.params.discussionId)
			this.setState({location: this.props.location.pathname})
		}
	}

	handleTextSelect = e => {
		e.preventDefault()
		// console.log("selected some text")
		// console.log(e.target === window.getSelection().baseNode.parentNode)
		if (e.target === window.getSelection().baseNode.parentNode) {
			let selection= window.getSelection().getRangeAt(0);
			// console.log(selection)
			// debugger
			let selectedText = selection.extractContents();
			// console.log(selectedText)
			let span= document.createElement("span");
			span.style.backgroundColor = "yellow";
			span.id = `selection-${window.getSelection().anchorOffset}`
			span.appendChild(selectedText);
			selection.insertNode(span);
      
      const button = document.querySelector(`#${span.id}`);
      const popup = document.querySelector('#comment-popup');
			createPopper(button, popup, {
			  placement: 'bottom',
			});
		}
		// console.log(e.target.getSelection().toString())
	}

	render() {
		// debugger
		console.log(this.props.discussion)
		return (
			<div id="article-wrapper">
				{this.props.discussion ? 
					<div>
						<div id="article-title">{this.props.discussion.article.title}</div>
						<div onMouseUp={this.handleTextSelect} id="article-content">{this.props.discussion.article.content}</div>						
						<div id="comment-popup" role="tooltip">My tooltip</div>
					</div>
					: 
					<h3>Loading</h3>}
			</div>
		)
	}
}


export default connect(state => ({discussion: state.discussion.discussion}), { fetchDiscussion })(Article);

				// <h3>{this.props.discussion ?this.props.discussion.article.title : null}</h3>