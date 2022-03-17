import React, { useState, useEffect } from "react"
import { changeMemberFollow } from "../../actions/networkActions.js"
import { connect } from "react-redux"
// import { connect } from "react-redux"


const FollowButton = (props) => {
  const [stateMemberHandle, setStateMemberHandle] = useState("");
  const [stateFollowStatusButtonHover, setStateFollowStatusButtonHover] = useState(false)

  const renderButtonText = () => {
    if (props.member.is_following) {
      return stateFollowStatusButtonHover ? "unfollow" : "following"
    } else {
      return "follow"
    }
  }

  const handleFollowUpdate = () => {
    props.changeMemberFollow(props.member.id, !props.member.is_following)
  }  

  return (
    <div className="follow-status-wrapper">
      <button 
        className={
          `follow-status-button 
          ${(props.member.is_following && !stateFollowStatusButtonHover) ? "following-state" : 
          (props.member.is_following && stateFollowStatusButtonHover) ? "following-hover" : 
          (!props.member.is_following && !stateFollowStatusButtonHover) ? "not-following-state" : 
          (!props.member.is_following && stateFollowStatusButtonHover) ? "not-following-hover" : "" 
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

const mapStateToProps = state => {
  return {
    memberFollowingStatus: state.network.memberFollowingStatus
  }
}


export default connect(mapStateToProps, { changeMemberFollow })(FollowButton);