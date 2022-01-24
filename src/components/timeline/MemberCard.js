import React from "react"
import { connect } from "react-redux"

// import { connect } from 'getstream';

const MemberCard = (props) => {
	debugger
	return (
		<div id="member-card-container">	 
			{props.member.handle}
		</div>
	)
}


export default connect()(MemberCard);