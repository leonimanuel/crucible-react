import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { showSelectedContact } from "../../actions/networkActions.js"

import FollowButton from "./FollowButton.js"

// import { connect } from 'getstream';

const ContactResult = (props) => {
	let followStatusObj = props.membersFollowStatuses.find(i => i.memberId == props.contact.id )
	return (
		<div 
			className={`contact-result-container`} 
			>	 
				<Link 
					to={`/profiles/${props.contact.id}`} 
					className="contact-result-link"
					onClick={() => {
						 props.showSelectedContact(props.contact.id);
						 props.onContactSelect()
					}}					
				>

					{props.contact.handle}	
				</Link>			
				
				{followStatusObj ? <FollowButton member={ props.contact} followStatus={followStatusObj.isFollowing}/> : null	}
		</div>
	)
}

const mapStateToProps = state => {
  return {
    membersFollowStatuses: state.network.membersFollowStatuses
  }
}

export default connect(mapStateToProps, { showSelectedContact })(ContactResult);