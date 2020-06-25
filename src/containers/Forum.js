import React, { Component } from 'react';
import "./forum.css"
import ForumMessageForm from "../components/agora/forum/ForumMessageForm.js"

class Forum extends Component {

	render() {
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					HEADER GOES HERE
				</div>

				<div id="forum-messages-container">
					{this.props.discussion.messages.map(m => <div>{m.text}</div>)}
				</div>

				<ForumMessageForm discussion={this.props.discussion}/>
			</div>
		)
	}
}


export default Forum;

				// <ForumHeader />
				// <ForumMessagesContainer />
				// <ForumInput />