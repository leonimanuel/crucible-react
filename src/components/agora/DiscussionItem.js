import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsItem extends Component {
	render() {
		const { discussion } = this.props;
		return (
			<div className="discussion-item sidenav-item">
				<Link 
					to={`/groups/${this.props.groupName.split(" ").join("-")}/discussions/${discussion.slug}`}
					style={{ textDecoration: 'none' }} 
				>
					<div className="discussion-title">
						{discussion.name}
						{discussion.read ? null : <div className="discussion-unread-label">UNOPENED</div>}
					</div>

				</Link>
				{discussion.unread_messages_count 
					? <div className="badge discussion-badge">{discussion.unread_messages_count}</div>
					: null
				}
			</div>
		)
	}
}

export default connect()(DiscussionsItem);




				// <div>{this.props.discussion.name}</div>
// `/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.name}`
 // onClick={() => this.props.fetchDiscussion(this.props.discussion)} 