import React, { Component } from 'react';
import "./forum.css"

class Forum extends Component {

	render() {
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					HEADER GOES HERE
				</div>

				<div id="forum-messages-container">
					MESSAGES GO HERE
				</div>

				<div id="forum-input-wrapper">
					<form id="forum-input-form">
						<input type="text" name="message"/>
					</form>
				</div>
			</div>
		)
	}
}


export default Forum;

				// <ForumHeader />
				// <ForumMessagesContainer />
				// <ForumInput />