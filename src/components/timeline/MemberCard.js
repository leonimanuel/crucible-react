import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

// import {getMemberConnectionStatus, changeMemberFollow} from "../../actions/networkActions.js"
// import { connect } from 'getstream';

import FollowButton from "../network/FollowButton.js"

const MemberCard = (props) => {
	const fc_ratio = props.member.fact_comment_ratio

	return (
		<div id="member-card-container" className="timeline-card-container">	 
			<div id="member-card-handle-wrapper">
				<div id="member-card-handle" className="timeline-card-name">{props.member.handle}</div> 
				{props.member.id == props.currentUserId ? null : <FollowButton member={props.member} followStatus={props.membersFollowStatuses.find(i => i.memberId == props.member.id ).isFollowing } />}
			</div>
			
			<div id="member-card-details-wrapper">
				<div id="member-card-stats-wrapper">
					<div className="stats-section">
						<div className="member-card-stat-item">	
							<div className="member-card-stat-label">
								Posts
							</div>
							<div className="member-card-stat-value">
								{props.member.comments_count + props.member.positions_count}
							</div>																							
						</div>

						<div className="member-card-stat-item">	
							<div className="member-card-stat-label">
								Excerpts
							</div>
							<div className="member-card-stat-value">
								{props.member.facts_count}
							</div>		
						</div>
					</div>

					<div className="stats-section">
						<div className="member-card-stat-item">
							<div className="member-card-stat-label">
								Followers
							</div>
							<div className="member-card-stat-value">
								{props.member.follow_stats.followers}
							</div>																								
						</div>	

						<div className="member-card-stat-item">
							<div className="member-card-stat-label">
								Following
							</div>
							<div className="member-card-stat-value">
								{props.member.follow_stats.following}
							</div>																								
						</div>	
					</div>														
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
  return {
    membersFollowStatuses: state.network.membersFollowStatuses,
    currentUserId: state.users.user.id
  }
}

export default connect(mapStateToProps, {/*getMemberConnectionStatus, changeMemberFollow*/})(MemberCard);














