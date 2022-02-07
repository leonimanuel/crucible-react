import React from "react"
import { connect } from "react-redux"

// import { connect } from 'getstream';

const MemberCard = (props) => {
	debugger
	return (
		<div id="member-card-container">	 
			<div id="member-card-handle-wrapper">
				<div id="member-card-handle">{props.member.handle}</div> 
			</div>
			
			<div id="member-card-details-wrapper">
				<div id="member-card-stats-wrapper">
					<div className="member-card-stat-item">
						<div className="member-card-stat-label">
							F/C
						</div>
						<div className="member-card-stat-value">
							{props.member.fact_comment_ratio}
						</div>																								
					</div>

					<div className="member-card-stat-item">	
						<div className="member-card-stat-label">
							Comments
						</div>
						<div className="member-card-stat-value">
							{props.member.comments_count}
						</div>																							
					</div>

					<div className="member-card-stat-item">	
						<div className="member-card-stat-label">
							Positions
						</div>
						<div className="member-card-stat-value">
							{props.member.positions_count}
						</div>	
					</div>

					<div className="member-card-stat-item">	
						<div className="member-card-stat-label">
							Facts
						</div>
						<div className="member-card-stat-value">
							{props.member.facts_count}
						</div>		
					</div>
				</div>
			</div>

		</div>
	)
}


export default connect()(MemberCard);