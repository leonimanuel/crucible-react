import React, { Component } from 'react';
// import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
import { addFactToNew } from "../../actions/topicsActions.js"

// import _ from 'lodash';
// import cloneDeep from "lodash/cloneDeep"

import { createPopper } from "@popperjs/core"
import { addComment, falsifyAddedNewComment, truthifyCommentsRendered } from "../../actions/discussionsActions.js"
import { v4 as uuidv4 } from 'uuid';
import ArticleComment from "./ArticleComment.js"
import SelectionMenu from "./SelectionMenu.js"
import ArticleContent from "./ArticleContent.js"
import AddListItemButton from "./AddListItemButton.js"
import AddGuestsPopup from "./AddGuestsPopup.js"
import ReviewItemsWrapper from "../review/ReviewItemsWrapper.js"

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
			previousElId: "",
			hoverSelectionComment: "",
			highlightClicked: false,
			textSelected: false,
			forumHovered: false,
			renderAddGuestsPopup: false,
			showGame: false
			// participants: []
		}
	}

	componentDidMount() {
		this.props.fetchDiscussion(this.props.match.params.groupName, this.props.match.params.discussionName)
		// this.setState({location: this.props.location.pathname})
	}

	componentDidUpdate(previousProps, previousState) {
		// console.log(previousProps === this.props)
		if (this.props.location.pathname !== this.state.location) {
			this.props.fetchDiscussion(this.props.match.params.groupName, this.props.match.params.discussionName)
			this.setState({location: this.props.location.pathname})
		}
		// if (this.props.members.length && previousProps.members !== this.props.members) {
		// 	debugger
		// 	let participants = _.cloneDeep([...this.props.members, ...this.props.guests])
		// 	const availableColors = ["#abf0e9", "#f9b384", "#84a9ac", "#5c2a9d", "#abc2e8", "#cfe5cf", "#e8505b"]
		// 	// let i = 0
		// 	participants.map(p => {
		// 			let randomColor = availableColors[Math.floor(Math.random() * availableColors.length)]
		// 			p.color = p.id === this.props.userId ? "cadetblue" : randomColor
		// 	})
		// 	this.setState({participants: participants})
		// }

		if (document.getElementById("article-content") && document.getElementById("article-content").innerHTML && this.props.comments.length > 0 && this.props.commentsRendered === false) {
			this.renderCommentHighlights(this.props.comments)
		} 
		else if (this.props.comments.length > 1 && this.props.addedNewComment === true) {
			this.renderCommentHighlights([this.props.comments[this.props.comments.length - 1]])
			this.props.falsifyAddedNewComment()
		}
	}

	handleTextSelect = e => {
		// console.log(this)
		e.preventDefault()
		if (e.target === window.getSelection().baseNode.parentNode && window.getSelection().baseNode.parentNode.tagName !== "SPAN" && window.getSelection().toString().length > 0) {
			debugger
			let range = window.getSelection().getRangeAt(0);
			let startOffset = range.startOffset
			let endOffset = range.endOffset
			
			let paragraph = window.getSelection().baseNode.parentNode
			let previousEl
			if (range.startContainer.previousElementSibling) {
				previousEl = range.startContainer.previousElementSibling
			} else {
				previousEl = paragraph
				// previousEl = document.getElementById("article-content")
			}
			let selectedText = range.extractContents();
			let span = document.createElement("span");
			span.id = `selection-${uuidv4()}`
			span.style.backgroundColor = "orange";
			span.appendChild(selectedText);
			range.insertNode(span);
			
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
	}

	renderCommentHighlights = (comments) => {
		comments.map(comment => {
			// let articleContent = document.getElementById("article-content");
			let range = new Range()

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
			const author = [...this.props.members, ...this.props.guests].find(p => p.id === comment.user_id)
			span.style.backgroundColor = author.color;
			span.classList.add("comment-highlight")
			span.id = comment.span_id

			span.appendChild(selectedText);
			range.insertNode(span);

			span.addEventListener("mouseenter", () => {
				// debugger
				if (!this.state.highlightClicked) {
					span.style.border = "none"
					this.handleHover(comment)
				}
				// this.newCommentPopper(comment)
			})

			span.addEventListener("click", () => {
				// console.log(ReactDOM.render(<ArticleComment />))
				this.toggleHighlightClicked(span, comment)
			})

			span.addEventListener("mouseleave", () => {
				console.log("mouse left")
				if (!this.state.highlightClicked) {
					this.setState({
						...this.state,
						hoverSelectionComment: ""
					})
				}
				console.log("dueces")
			})
			return comment
		})
		
		this.props.truthifyCommentsRendered()
		// this.setState({
		// 	...this.state,
		// 	commentsLoaded: true,
		// 	// addingComment: false
		// })
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

	toggleHighlightClicked = (span, comment) => {
		this.setState({
			...this.state, 
			highlightClicked: !this.state.highlightClicked, 
			hoverSelectionComment: comment 
		}, () => {
			span.style.border = this.state.highlightClicked === true ? "2px solid gold" : ""
			this.newCommentPopper(comment)
			document.querySelector(`#comment-popup`).style.boxShadow = this.state.highlightClicked === true ? "0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12)" : ""
		})
	}

	handleSubmitComment = (e, commentText, facts) => {
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

	handleCollectFact = (e, rephrase) => {
		debugger
		e.preventDefault();
		this.props.addFactToNew(this.state.span.innerText, this.props.discussion.article_url, rephrase)
		this.setState({textSelected: false})
			let span = document.getElementById(this.state.span.id);
			let parent = span.parentNode;
			parent.insertBefore(span.firstChild, span);
			parent.removeChild(span)
			parent.normalize()
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

	onForumHoverStart = () => {
		if (!this.props.comments.filter(c => c.user_id === this.props.userId).length) {
			this.setState({
				forumHovered: true
			}, () => {
				const button = document.getElementById("show-forum-button")
				const popup = document.getElementById("forum-lock-popup")
				createPopper(button, popup, {
					placement: "left"
				}) 
			})
		}
	}

	onForumHoverEnd = () => {
		this.setState({
			forumHovered: false
		})
	}

	adjustFontSize = (direction) => {
		const articleContent = document.getElementById("article-text-content")
		let currentSizeInt = parseFloat(articleContent.style.fontSize.split("em")) 
		debugger
		// if (direction === "+") {
		// 	articleContent.style.fontSize = 
		// }
		articleContent.style.fontSize = direction === "+" ? `${currentSizeInt + 0.1}em` : `${currentSizeInt - 0.1}em`
		// articleContent.style.fontSize = direction === "+" ? 
	}

	handleAddGuests = () => {
		this.setState({
			renderAddGuestsPopup: true
		}, () => {
			let button = document.querySelector("#add-guests-button");
			let popup = document.querySelector("#add-guests-popup")
			createPopper(button, popup, {
			  placement: 'bottom',
			  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
			});			
		})
	}

	showGame = () => {
		debugger
		this.setState({showGame: true})
	}

	closeAddGuestsPopup = () => {
		this.setState({...this.state, renderAddGuestsPopup: false})
	}

	render() {
		const dailysHit = this.props.dailyReviews >= 10 && this.props.dailyFactsComments >= 3
		const forumUnlocked =  !!this.props.comments.filter(c => c.user_id === this.props.userId).length || dailysHit || (this.props.discussion ? this.props.discussion.admin : true)
		const disableProceed = this.props.dailyReviews >= 10 ? false : false
		debugger
		return (
			<div id="article-outer-container">
				{this.props.discussion && this.props.discussion.article ? 
					this.state.showGame
						?
							<div id="article-wrapper" className="draw" >
								<div id="font-size-buttons-wrapper">
									<button onClick={() => this.adjustFontSize("+")}>+</button>
									<button onClick={() => this.adjustFontSize("-")}>-</button>
								</div>		
								{this.props.discussion.article.article_type === "news" ? <div className="daily-hit-tag" id="daily-news-tag" style={{"background-color": "cadetblue"}}>daily news hit</div> : null}
								{this.props.discussion.article.article_type === "thinker" ? <div className="daily-hit-tag" id="daily-opinion-tag" style={{"background-color": "#0f4c75"}}>daily opinion hit</div> : null}
								<div id="title-and-forum-button">
									<a href={this.props.discussion.article_url} target="_blank" rel="noopener noreferrer">
										<div id="article-title">{this.props.discussion.article.title}</div>
									</a>
									<div 
										id="show-forum-button" 
										onClick={forumUnlocked ? this.props.onForumClick : null}
										onMouseEnter={forumUnlocked ? null : this.onForumHoverStart}
										onMouseLeave={forumUnlocked ? null : this.onForumHoverEnd}
										style={{"background-color": forumUnlocked ? "gold" : "silver"}}
									>
										<div id="show-forum-button-text">Forum</div>
										{this.props.discussion.unread_messages_count
											? <div id="forum-badge" className="badge">{this.props.discussion.unread_messages_count}</div>
											: null
										}
									</div>
								</div>
								<div id="article-content" onMouseDown={this.clearTextSelected}>							
									<div id="article-info-container">
										<div id="author-and-date-published">
											<div id="article-author">{this.props.discussion.article.author}</div>
											<div id="article-publish-date">{this.props.discussion.article.date_published}</div>
										</div>
										<div id="participants-wrapper">
											<div id="participants-header-wrapper">
												<div id="participants-header">Participants</div>
												<AddListItemButton id="add-guests-button" buttonAction={this.handleAddGuests} fill="cadetblue"/>
											</div>
											{this.props.members.map(m => <div className="discussion-participant discussion-member" style={{backgroundColor: m.color}}>{m.id === this.props.userId ? "You" : m.name}</div>)}
											{this.props.guests.map(g => {
												return (
													<div className="discussion-participant discussion-guest" style={{backgroundColor: g.color}}>
														{g.id === this.props.userId ? "You" : g.name}
														<div className="guest-marker">guest</div>
													</div>
												)
											}) 
											}

										</div>
									</div>

									<ArticleContent id="article-text-content" discussion={this.props.discussion} onHighlight={this.handleTextSelect} />
								</div>						
								
								{this.state.textSelected 
									? <SelectionMenu id="selection-popup" 
											selection={this.state.span.innerText} 
											submitComment={this.handleSubmitComment} 
											collectFact={this.handleCollectFact} 
											closePopup={this.clearTextSelected} /> 
									: null
								}
								{this.state.hoverSelectionComment || this.state.highlightClicked
									? <ArticleComment 
											id="comment-popup" 
											comment={this.state.hoverSelectionComment} /> 
									: null
								}
								{this.state.forumHovered
									? <div id="forum-lock-popup" className="popup">
											Make at least one comment on this article or hit your daily quotas to access the forum.
										</div>
									:
										null
								}
							</div>
						: 
							<React.Fragment>
								<ReviewItemsWrapper context="pregame" handleProceed={this.showGame} disableProceed={disableProceed}/>																			
							</React.Fragment>
					: 
					<h3>Loading</h3>
				}

				{this.state.renderAddGuestsPopup ? 
					<AddGuestsPopup 
						discussion={this.props.discussion} 
						closePopup={this.closeAddGuestsPopup}
						members={this.props.members}
						guests={this.props.guests}
					/> 
					: null
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const discussion = state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId)
	return {
		discussion: discussion,
		comments: state.discussions.allComments.filter(c => c.discussion_id === state.discussions.selectedDiscussionId),
		addedNewComment: state.discussions.addedNewComment,
		commentsRendered: state.discussions.commentsRendered,
		userId: state.users.userId,
		dailyReviews: state.users.dailyReviews,
		dailyFactsComments: state.users.dailyFactsComments,
		// participants: [
		// 	...state.groups.allMembers.filter(mem => mem.group_id === state.discussions.selectedDiscussion.group_id && mem.id !== state.users.userId),
		// 	...state.discussions.discussionGuests.filter(guest => guest.id !== state.users.userId)
		// ]
		members: state.groups.allMembers.filter(mem => mem.group_id === state.discussions.selectedDiscussion.group_id),
		guests: state.discussions.discussionGuests.filter(guest => guest.id /*!== state.users.userId*/)

	}
}


export default connect(mapStateToProps, { truthifyCommentsRendered, fetchDiscussion, addComment, falsifyAddedNewComment, addFactToNew })(Article);


