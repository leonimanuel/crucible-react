import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "./DiscussionItem.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsList extends Component {
	render() {
		return (
			<div id="group-discussions-list">
				<div>Discussions</div>
				<div>
					{this.props.discussions.map(discussion => <DiscussionItem key={discussion.id} discussion={discussion}/>)}
				</div>
			</div>
		)
	}
}


export default connect()(DiscussionsList);




