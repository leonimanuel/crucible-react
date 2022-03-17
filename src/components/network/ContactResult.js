import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { showSelectedContact } from "../../actions/networkActions.js"

import FollowButton from "./FollowButton.js"

// import { connect } from 'getstream';

const ContactResult = (props) => {
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
				<FollowButton member={props.contact}/>	
		</div>
	)
}


export default connect(null, { showSelectedContact })(ContactResult);