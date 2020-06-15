import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchDiscussion } from "../../actions/groups.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsItem extends Component {
	render() {
		return (
			<div onClick={() => this.props.fetchDiscussion(this.props.discussion)} className="discussion-item">
				<div>{this.props.discussion.name}</div>
			</div>
		)
	}
}

export default connect(null, { fetchDiscussion })(DiscussionsItem);




