import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

const GroupCard = (props) => {
	return (
		<div id="">	 
			THIS IS GROUP NUMBER {props.groupId}
		</div>
	)
}

const mapStateToProps = state => {
  return {
    // membersFollowStatuses: state.network.membersFollowStatuses,
    // currentUserId: state.users.user.id
  }
}

export default connect(mapStateToProps, {/*getMemberConnectionStatus, changeMemberFollow*/})(GroupCard);














