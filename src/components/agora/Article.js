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
import ArticleContent from "./ArticleContent.js"

class Article extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleContent: "HEY THERE",
			location: props.location.pathname,
			comment: "",
			span: "",
			startOffset: "",
			endOffset: "",
			commentsLoaded: false,
			previousElId: "",
			hoverSelectionComment: "",
			highlightClicked: false,
			textSelected: false,
		}
	}

	componentDidMount() {
		// debugger
		this.props.fetchDiscussion(this.props.match.params.groupName, this.props.match.params.discussionName)
		// this.setState({location: this.props.location.pathname})
	}

	componentDidUpdate(previousProps, previousState) {
		// debugger
		if (this.props.location.pathname !== this.state.location) {
			this.props.fetchDiscussion(this.props.match.params.groupName, this.props.match.params.discussionName)
			this.setState({location: this.props.location.pathname})
		}

		if (document.getElementById("article-content") && document.getElementById("article-content").innerHTML && this.props.comments.length > 0 && this.state.commentsLoaded === false) {
			this.renderCommentHighlights(this.props.comments)
		} else if (this.props.comments.length > 0 && this.props.addedNewComment === true) {
			this.renderCommentHighlights([this.props.comments[this.props.comments.length - 1]])
			this.props.falsifyAddedNewComment()
		}
	}

	handleTextSelect = e => {
		// console.log(this)
		e.preventDefault()
		if (e.target === window.getSelection().baseNode.parentNode && window.getSelection().toString().length > 0) {
			let range = window.getSelection().getRangeAt(0);
			let startOffset = range.startOffset
			let endOffset = range.endOffset
			
			let paragraph = window.getSelection().baseNode.parentNode
			let previousEl
			if (range.startContainer.previousElementSibling) {
				previousEl = range.startContainer.previousElementSibling
				// debugger
			} else {
				previousEl = paragraph
				// previousEl = document.getElementById("article-content")
				// debugger
			}
			let selectedText = range.extractContents();
			let span = document.createElement("span");
			span.id = `selection-${uuidv4()}`
			span.style.backgroundColor = "orange";
			span.appendChild(selectedText);
			range.insertNode(span);
			debugger
			
			this.setState({
				...this.state,
				span: span,
				startOffset: startOffset,
				endOffset: endOffset,
				previousElId: previousEl.id,
				textSelected: true
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
		comments.map(comment => {
			let articleContent = document.getElementById("article-content");
			let range = new Range

			let previousEl = document.getElementById(comment.previous_el_id)
			
			if (previousEl.tagName === "P") {
				range.setStart(previousEl.firstChild, comment.startPoint)
				range.setEnd(previousEl.firstChild, comment.endPoint)					
			} else {
				range.setStart(previousEl.nextSibling, comment.startPoint)
				range.setEnd(previousEl.nextSibling, comment.endPoint)				
			}

			let selectedText = range.extractContents();		
			let span = document.createElement("span");
			span.style.backgroundColor = "#9bdeac";
			span.classList.add("comment-highlight")
			span.id = comment.span_id

			span.appendChild(selectedText);
			range.insertNode(span);

			span.addEventListener("mouseenter", () => {
				// debugger
				this.handleHover(comment)
				// this.newCommentPopper(comment)
			})

			span.addEventListener("click", () => {
				// console.log(ReactDOM.render(<ArticleComment />))
				this.toggleHighlightClicked(span)
			})

			span.addEventListener("mouseleave", () => {
				if (!this.state.highlightClicked) {
					this.setState({
						...this.state,
						hoverSelectionComment: ""
					})
				}
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
		this.newCommentPopper(comment)
	}

	newCommentPopper = (comment) => {
		console.log("new comment popper")
    const commentSpan = document.querySelector(`#${comment.span_id}`);

		const popup = document.querySelector(`#comment-popup`)
    // popup.setAttribute("data-show", "")
		createPopper(commentSpan, popup, {
		  placement: 'right',
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

	toggleHighlightClicked = (span) => {
		this.setState({
			...this.state, highlightClicked: !this.state.highlightClicked
		}, () => {
			span.style.border = this.state.highlightClicked === true ? "2px solid gold" : ""
			document.querySelector(`#comment-popup`).style.border = this.state.highlightClicked === true ? "2px solid gold" : ""
		})
	}

	handleSubmitComment = (e, commentText, facts) => {
		debugger
		e.preventDefault()
		this.props.addComment(
			this.props.discussion.group_id,
			this.props.discussion.id,
			// this.props.match.params.groupId,
			// this.props.match.params.discussionId,
			commentText,
			this.state.span,
			this.state.startOffset,
			this.state.endOffset,
			this.state.previousElId,
			facts
			// this.state.selection,
		)

		let span = document.getElementById(this.state.span.id);
		let parent = span.parentNode;
		parent.insertBefore(span.firstChild, span);
		parent.removeChild(span)
		parent.normalize()

		this.setState({...this.state, textSelected: false, span: ""})
	}

	handleCollectFact = () => {
		this.props.addFactToNew(this.state.span.innerText, this.props.discussion.article_url)
	}

	clearTextSelected = (e) => {            //!document.getElementById("comment-textarea").value
		if (this.state.textSelected === true && (e.target.id === "selection-menu-close-button" ? true : !document.getElementById("comment-textarea").value)) {
			this.setState({...this.state, textSelected: false}, () => {
				let span = document.getElementById(this.state.span.id);
				let parent = span.parentNode;
				parent.insertBefore(span.firstChild, span);
				parent.removeChild(span)
				parent.normalize()
			})
		}
	}

	render() {
		console.log(this.props.discussion)
		// debugger
		return (
			<div id="article-outer-container">
				{this.props.discussion && this.props.discussion.article ? 
					<div id="article-wrapper" className="draw" >
						<div id="title-and-forum-button">
							<div id="article-title">{this.props.discussion.article.title}</div>
							<div id="show-forum-button" onClick={this.props.onForumClick}>
								<div id="show-forum-button-text">Forum</div>
								{this.props.discussion.unread_messages_count
									? <div id="forum-badge" className="badge">{this.props.discussion.unread_messages_count}</div>
									: null
								}
							</div>
						</div>
						<div onMouseUp={this.handleTextSelect} id="article-content" onMouseDown={this.clearTextSelected}>							
							{/*this.handleArticleHTML()*/}
							<div id="article-info-container">
								<div id="author-and-date-published">
									<div id="article-author">{this.props.discussion.article.author}</div>
									<div id="article-publish-date">{this.props.discussion.article.date_published}</div>
								</div>
							</div>

							<ArticleContent />
						</div>						
						
						{this.state.textSelected 
							? <SelectionMenu id="selection-popup" 
									selection={this.state.span.innerText} 
									submit={this.handleSubmitComment} 
									collectFact={this.handleCollectFact} 
									closePopup={this.clearTextSelected} /> 
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
		discussion: state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId),
		// discussion: state.discussion.discussion,
		// discussions: state.discussion.discussions, 
		comments: state.discussions.allComments.filter(c => c.discussion_id === state.discussions.selectedDiscussionId),
		addedNewComment: state.discussions.addedNewComment
	}
}


export default connect(mapStateToProps, { fetchDiscussion, addComment, falsifyAddedNewComment, addFactToNew })(Article);


