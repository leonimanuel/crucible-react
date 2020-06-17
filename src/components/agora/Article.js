import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"
import { addComment } from "../../actions/discussionsActions.js"


class Article extends Component {
	state = {
		location: "",
		comment: "",
		span: "",
		startOffset: "",
		endOffset: "",
		commentsLoaded: false
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

		if (this.props.comments.length > 0 && this.state.commentsLoaded === false) {
			this.props.comments.map(comment => this.createCommentPopper(comment))
		}
	}

	handleTextSelect = e => {
		e.preventDefault()
		if (e.target === window.getSelection().baseNode.parentNode && window.getSelection().toString().length > 0) {
			let range = window.getSelection().getRangeAt(0);
			let startOffset = range.startOffset
			let endOffset = range.endOffset
			// debugger
			let selectedText = range.extractContents();
			
			// console.log(selectedText)
			let span = document.createElement("span");
			span.style.backgroundColor = "yellow";
			span.id = `selection-${window.getSelection().anchorOffset}`
			span.appendChild(selectedText);
			range.insertNode(span);
			
			this.setState({
				...this.state,
				span: span,
				startOffset: startOffset,
				endOffset: endOffset
				// selection: window.getSelection().toString()
			})

			// debugger
      const button = document.querySelector(`#${span.id}`);
      const popup = document.querySelector('#selection-popup');
			popup.setAttribute('data-show', '');

			createPopper(button, popup, {
			  // placement: 'bottom',
			  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
			});
		}
	}

	createCommentPopper(comment) {
		let articleContent = document.getElementById("article-content");
		
		let range = new Range
		range.setStart(articleContent.lastChild, comment.startPoint)
		range.setEnd(articleContent.lastChild, comment.endPoint)
		let selectedText = range.extractContents();

		let span = document.createElement("span");
		span.style.backgroundColor = "yellow";
		span.id = `selection-${comment.startPoint}`

		span.appendChild(selectedText);
		range.insertNode(span);

		span.addEventListener("mouseenter", () => {
	    const commentSpan = document.querySelector(`#${comment.span_id}`);
	    const popup = document.querySelector('#comment-popup');
	    // debugger
	    popup.innerHTML = `<div>${comment.content}</div>`
			popup.setAttribute('data-show', '');

			createPopper(commentSpan, popup, {
			  placement: 'left',
			  // modifiers: [
			  //   {
			  //     name: 'offset',
			  //     options: {
			  //       offset: [0, 4],
			  //     },
			  //   },
			  // ],
			});
		})

		span.addEventListener("mouseleave", () => {
			let popper = document.getElementById("comment-popup")
			if (popper) {
				// alert("pop boi")
				popper.removeAttribute('data-show')
			}
		})

		this.setState({
			...this.state,
			commentsLoaded: true
		})
	}

	handleChange = e => {
		// debugger
		this.setState({
			...this.state,
			comment: e.target.value
		})
		console.log(e.target.value)
	}

	handleSubmitComment = (e) => {
		debugger
		e.preventDefault()
		this.props.addComment(
			this.props.match.params.groupId,
			this.props.match.params.discussionId,
			this.state.comment,
			this.state.span,
			this.state.startOffset,
			this.state.endOffset
			// this.state.selection,
		)
    
    const popup = document.querySelector('#selection-popup');
		popup.removeAttribute('data-show');
	}

	render() {
		// debugger
		console.log(this.props.comments)
		return (
			<div id="article-wrapper">
				{this.props.discussion ? 
					<div>
						<div id="article-title">{this.props.discussion.article.title}</div>
						<div onMouseUp={this.handleTextSelect} id="article-content">{this.props.discussion.article.content}</div>						
						
						<div id="selection-popup" role="tooltip">
							Context Menu
							<div id="arrow" data-popper-arrow></div>
							<form onSubmit={this.handleSubmitComment} id="new-comment-form">
								Comment: <textarea onChange={this.handleChange} value={this.state.comment} name="comment" id="" cols="20" rows="3"></textarea> <br/>
								<input type="submit" value="post"/>
							</form>
						</div>
						
						<div id="comment-popup">
							COMMENTBOI
							{/*<div id="arrow" data-popper-arrow></div>*/}
						</div>

					</div>				
					: 
					<h3>Loading</h3>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discussion: state.discussion.discussion,
		comments: state.discussion.comments
	}
}


export default connect(mapStateToProps, { fetchDiscussion, addComment })(Article);

						// <div>{this.props.comments ? this.props.comments.map(comment => <div>Commentodos</div>) : null}</div>

				// <h3>{this.props.discussion ?this.props.discussion.article.title : null}</h3>