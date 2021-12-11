import React, { Component } from 'react';

class TimelineItemHeader extends Component {
	render() {
		const { actor } = this.props
		return (
			<div className="timeline-item-header">
				<div>{actor.name}</div>
			</div>
		)
	}
}


export default TimelineItemHeader;




