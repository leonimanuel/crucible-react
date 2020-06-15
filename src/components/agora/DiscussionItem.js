import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsItem extends Component {
	render() {
		return (
			<div className="discussion-item">
				<div>{this.props.discussion.name}</div>
			</div>
		)
	}
}

export default connect()(DiscussionsItem);




