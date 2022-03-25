import React, { Component } from 'react';
import { Link } from "react-router-dom";

class TaggedUsers extends Component {
	render() {
		debugger
		return (
			<div className="tagged-users-wrapper">
				{this.props.tagged_users.length ? <span>tagged: </span> : null}
				{this.props.tagged_users.map((u, index) => {
					return (
						<React.Fragment>
							<span className="tagged-user"><Link className="tagged-user-link" to={`/profiles/${u.id}`}>{u.handle}</Link>{index == this.props.tagged_users.length-1 ? null : ","} </span>		
						</React.Fragment>
					)
				})}
			</div>
		)
	}
}

export default TaggedUsers;




