import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// import { showSelectedContact } from "../../actions/networkActions.js"

// import FollowButton from "./FollowButton.js"

// import { connect } from 'getstream';

const GroupSearchResult = (props) => {
	// let followStatusObj = props.membersFollowStatuses.find(i => i.memberId == props.contact.id )
	// debugger
	return (
		<div 
			className={`contact-result-container`} 
			>	 
				<Link 
					to={`/groups/${props.group.id}`} 
					className="contact-result-link"
					onClick={() => {
						 props.onGroupSelect(props.group.id);
					}}					
				>

					{props.group.name}	
				</Link>			
				
				{
					props.context == "group" && props.admin ? "admin" : null
				}

				{/*followStatusObj ? <FollowButton member={ props.contact} followStatus={followStatusObj.isFollowing}/> : null	*/}
		</div>
	)
}

const mapStateToProps = state => {
  return {
    membersFollowStatuses: state.network.membersFollowStatuses
  }
}

export default connect(mapStateToProps, {/* showSelectedContact */})(GroupSearchResult);