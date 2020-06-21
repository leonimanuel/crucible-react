import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
import { addFactToNew } from "../../actions/topicsActions.js"

import { createPopper } from "@popperjs/core"
import { addComment, falsifyAddedNewComment } from "../../actions/discussionsActions.js"
import { v4 as uuidv4 } from 'uuid';
import ArticleComment from "./ArticleComment.js"
import SelectionMenu from "./SelectionMenu.js"

class Article extends Component {
	state = {
		location: "",
		comment: "",
		span: "baseline",
		startOffset: "",
		endOffset: "",
		commentsLoaded: false,
		previousElId: "",
		hoverSelectionComment: "",
		textSelected: false
	}

	componentDidMount() {
		this.props.fetchDiscussion(this.props.match.params.groupId, this.props.match.params.discussionId)
		// this.handleArticleHTML()
		// let commentsLoaded
		// this.props.comments.length === 0 ? commentsLoaded = true : commentsLoaded = false
		// debugger
		// this.setState({
		// 	...this.state,
		// 	location: this.props.location.pathname,
		// 	commentsLoaded: commentsLoaded
		// })

	}

	componentDidUpdate() {
		// debugger
		if (this.props.location.pathname !== this.state.location) {
			this.props.fetchDiscussion(this.props.match.params.groupId, this.props.match.params.discussionId)
			this.setState({location: this.props.location.pathname})
		}

		if (this.props.comments.length > 0 && this.state.commentsLoaded === false) {
			debugger
			this.renderCommentHighlights(this.props.comments)
		} else if (this.props.comments.length > 0 && this.props.addedNewComment === true) {
			this.renderCommentHighlights([this.props.comments[this.props.comments.length - 1]])
			this.props.falsifyAddedNewComment()
		}
	}

	handleTextSelect = e => {
		console.log(this)
		e.preventDefault()
		if (e.target === window.getSelection().baseNode.parentNode && window.getSelection().toString().length > 0) {
			let range = window.getSelection().getRangeAt(0);

			let startOffset = range.startOffset
			let endOffset = range.endOffset
			
			let previousEl
			if (range.startContainer.previousElementSibling) {
				previousEl = range.startContainer.previousElementSibling
				// debugger
			} else {
				previousEl = document.getElementById("article-content")
				// debugger
			}
			let selectedText = range.extractContents();
			let span = document.createElement("span");
			span.id = `selection-${uuidv4()}`
			span.appendChild(selectedText);
			range.insertNode(span);
			// debugger
			
			this.setState({
				...this.state,
				span: span,
				startOffset: startOffset,
				endOffset: endOffset,
				previousElId: previousEl.id,
				textSelected: true
				// selection: window.getSelection().toString()
			}, () => {this.createSelectionMenu(span.id)})
		}
	}

	createSelectionMenu = (spanId) => {
		console.log(this.state.textSelected)
    // debugger
    const button = document.querySelector(`#${spanId}`);
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

		const collectFactPopup = document.querySelector(`#collect-fact-button`)
		createPopper(button, collectFactPopup, {
			placement: "right",
		  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
		})
	}

	renderCommentHighlights = (comments) => {
		debugger
		comments.map(comment => {
			// debugger
			let articleContent = document.getElementById("article-content");
			let range = new Range

			let previousEl = document.getElementById(comment.previous_el_id)
			
			if (comment.previous_el_id === "article-content") {
				range.setStart(articleContent.firstChild, comment.startPoint)
				range.setEnd(articleContent.firstChild, comment.endPoint)					
			} else {
				range.setStart(previousEl.nextSibling, comment.startPoint)
				range.setEnd(previousEl.nextSibling, comment.endPoint)				
			}

			let selectedText = range.extractContents();		
			let span = document.createElement("span");
			span.style.backgroundColor = "#9bdeac";
			span.id = comment.span_id

			span.appendChild(selectedText);
			range.insertNode(span);

			span.addEventListener("mouseenter", () => {
				// debugger
				this.handleHover(comment)
				// this.newCommentPopper(comment)
			})

			span.addEventListener("click", () => {
				console.log(ReactDOM.render(<ArticleComment />))
			})

			span.addEventListener("mouseleave", () => {
				this.setState({
					...this.state,
					hoverSelectionComment: ""
				})
				console.log("dueces")
			})
		})
		
		this.setState({
			...this.state,
			commentsLoaded: true,
			// addingComment: false
		})
	}

	handleHover = (comment) => {
		this.setState({
			...this.state,
			hoverSelectionComment: comment
		}, () => {
			this.newCommentPopper(comment)
		})
	}

	newCommentPopper = (comment) => {
		console.log("new comment popper")
    const commentSpan = document.querySelector(`#${comment.span_id}`);

		const popup = document.querySelector(`#comment-popup`)
    popup.setAttribute("data-show", "")

		createPopper(commentSpan, popup, {
		  placement: 'left',
		});	
	} 	

	handleSubmitComment = (e, commentText) => {
		// debugger
		e.preventDefault()
		this.props.addComment(
			this.props.match.params.groupId,
			this.props.match.params.discussionId,
			commentText,
			this.state.span,
			this.state.startOffset,
			this.state.endOffset,
			this.state.previousElId
			// this.state.selection,
		)

		// debugger
		let span = document.getElementById(this.state.span.id);
		let parent = span.parentNode;
		parent.insertBefore(span.firstChild, span);
		parent.removeChild(span)
		parent.normalize()

		this.setState({...this.state, textSelected: false})
	}

	handleCollectFact = () => {
		// debugger
		this.props.addFactToNew(this.state.span.innerText, this.props.discussion.article_url)
	}

	handleArticleHTML = () => {
		let articleContent = document.querySelector("#article-content")
		if (articleContent) {
			articleContent.innerHTML = this.props.discussion.article.content
			let HTMLboi = document.getElementsByTagName("p")
			let boi	= Array.from(HTMLboi)
			debugger
			boi.map((p, index) => {
				p.id = `p-${index + 1}`
				return p
			})
			// debugger
		}
	}

	render() {
		// debugger
		console.log(this.props.comments)
		return (
			<div >
				{this.props.discussion ? 
					<div id="article-wrapper" className="draw">
						<div id="article-title">{this.props.discussion.article.title}</div>
						<div onMouseUp={this.handleTextSelect} id="article-content">{/*this.props.discussion.article.content*/}</div>						
						{this.handleArticleHTML()}
						{this.state.textSelected 
							? <SelectionMenu id="selection-popup" 
									selection={this.state.span.innerText} 
									submit={this.handleSubmitComment} 
									collectFact={this.handleCollectFact} /> 
							: null
						}
						{this.state.hoverSelectionComment 
							? <ArticleComment 
									id="comment-popup" 
									comment={this.state.hoverSelectionComment} /> 
							: null
						}
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
		comments: state.discussion.comments,
		addedNewComment: state.discussion.addedNewComment
	}
}


export default connect(mapStateToProps, { fetchDiscussion, addComment, falsifyAddedNewComment, addFactToNew })(Article);


