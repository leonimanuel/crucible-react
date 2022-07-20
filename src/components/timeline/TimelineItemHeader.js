import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Moment from 'react-moment';
// import moment from 'moment';
import moment from 'moment-timezone';

class TimelineItemHeader extends Component {
	componentWillMount() {
		// alert(this.props.time.tz(this.props.time, "UTC"))
		moment.tz.setDefault("UTC") // VERY IMPORTANT. Otherwise, moment will think the activity timestamp is local timezone
	}
	render() {
		const { actor, group, showTracer } = this.props
		return (
			<div className={`timeline-item-header`}>
				<div className={`item-header-description ${showTracer ? "show-tracer" : ""}`}>
					<span className="item-header-username">
						<Link className="timeline-actor-link" to={`/profiles/${actor.id}`}>
							{actor.handle}
						</Link>
					</span>
					<span> {this.props.type}</span>
					{group ? <span> in <Link className="timeline-group-link" to={`/groups/${group.id}`}>{group.name}</Link></span> : null}
				</div>
				{<Moment fromNow>{this.props.time}</Moment>}
			</div>
		)
	}
}

export default TimelineItemHeader;




