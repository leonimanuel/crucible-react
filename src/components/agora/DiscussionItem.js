import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchDiscussion } from "../../actions/groups.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsItem extends Component {
	render() {
		// debugger
		return (
			<div className="discussion-item">
				<Link onClick={() => this.props.fetchDiscussion(this.props.discussion)} 
				to={`/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.name}`} >
					{this.props.discussion.name.split("_").join(" ")}
				</Link>
			</div>
		)
	}
}

export default connect(null, { fetchDiscussion })(DiscussionsItem);




				// <div>{this.props.discussion.name}</div>
// `/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.name}`
 // onClick={() => this.props.fetchDiscussion(this.props.discussion)} 