import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsItem extends Component {
	render() {
		// debugger
		return (
			<div className="discussion-item">
				<Link to={`/groups/${this.props.groupName.split(" ").join("-")}/discussions/${this.props.discussion.name}`} >
					{this.props.discussion.name.split("_").join(" ")}
				</Link>
				<div>{this.props.discussion.unread_messages_count}</div>
			</div>
		)
	}
}

export default connect()(DiscussionsItem);




				// <div>{this.props.discussion.name}</div>
// `/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.name}`
 // onClick={() => this.props.fetchDiscussion(this.props.discussion)} 