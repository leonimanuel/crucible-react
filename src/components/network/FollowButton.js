import React, { useState, useEffect } from "react"
import { changeMemberFollow } from "../../actions/networkActions.js"
import { connect } from "react-redux"
import { withRouter } from "react-router";
// import { connect } from "react-redux"


const FollowButton = (props) => {
  const [stateMemberHandle, setStateMemberHandle] = useState("");
  const [stateFollowStatusButtonHover, setStateFollowStatusButtonHover] = useState(false)

  const renderButtonText = () => {
    if (props.userId) {
      if (props.followStatus) {
        return stateFollowStatusButtonHover ? "unfollow" : "following"
      } else {
        return "follow"
      }
    } else {
      return "Join to follow"
    }
  }

  const handleFollowUpdate = () => {
    props.userId ? props.changeMemberFollow(props.member, !props.followStatus) : props.history.push("/signup");
    
  }  

  return (
    <div className="follow-status-wrapper">
      <button 
        className={
          `follow-status-button 
          ${(props.followStatus && !stateFollowStatusButtonHover) ? "following-state" : 
          (props.followStatus && stateFollowStatusButtonHover) ? "following-hover" : 
          (!props.followStatus && !stateFollowStatusButtonHover) ? "not-following-state" : 
          (!props.followStatus && stateFollowStatusButtonHover) ? "not-following-hover" : "" 
          }`
        }
        onMouseEnter={() => setStateFollowStatusButtonHover(true)} 
        onMouseLeave={() => setStateFollowStatusButtonHover(false)}
        onClick={handleFollowUpdate}
      >
        {renderButtonText()}
      </button>
    </div>
  )
}




export default connect(state => ({userId: state.users.userId}), { changeMemberFollow })(withRouter(FollowButton));