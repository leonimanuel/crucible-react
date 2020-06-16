import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
import { createPopper } from "@popperjs/core"
import { addComment } from "../../actions/discussionsActions.js"

class Article extends Component {
	state = {
		location: "",
		comment: "",
		selection: ""
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
		if (e.target === window.getSelection().baseNode.parentNode && window.getSelection().toString().length > 0) {
			let selection= window.getSelection().getRangeAt(0);
			let selectedText = selection.extractContents();
			// console.log(selectedText)
			let span= document.createElement("span");
			span.style.backgroundColor = "yellow";
			span.id = `selection-${window.getSelection().anchorOffset}`
			span.appendChild(selectedText);
			selection.insertNode(span);

			this.setState({
				...this.state,
				spanId: span.id
			})

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
		debugger
		console.log(comment)
		
    const span = document.querySelector(`#${comment.span_id}`);
    const popup = document.querySelector('#comment-popup');
		popup.setAttribute('data-show', '');
		
		createPopper(span, popup, {
		  placement: 'left',
		  modifiers: [
		    {
		      name: 'offset',
		      options: {
		        offset: [0, 4],
		      },
		    },
		  ],
		});
	}

	handleChange = e => {
		this.setState({
			...this.state,
			comment: e.target.value
		})
		console.log(e.target.value)
	}

	handleSubmitComment = (e) => {
		// debugger
		e.preventDefault()
		this.props.addComment(
			this.props.match.params.groupId,
			this.props.match.params.discussionId,
			this.state.comment,
			this.state.spanId
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
				<div>
					{this.props.comments ? this.props.comments.map(comment => this.createCommentPopper(comment)) : null}
				</div>
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