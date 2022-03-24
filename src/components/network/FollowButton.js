import React, { useState, useEffect } from "react"
import { changeMemberFollow } from "../../actions/networkActions.js"
import { connect } from "react-redux"
// import { connect } from "react-redux"


const FollowButton = (props) => {
  const [stateMemberHandle, setStateMemberHandle] = useState("");
  const [stateFollowStatusButtonHover, setStateFollowStatusButtonHover] = useState(false)

  const renderButtonText = () => {
    if (props.followStatus) {
      return stateFollowStatusButtonHover ? "unfollow" : "following"
    } else {
      return "follow"
    }
  }

  const handleFollowUpdate = () => {
    props.changeMemberFollow(props.member, !props.followStatus)
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




export default connect(null, { changeMemberFollow })(FollowButton);