import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { connect } from 'getstream';


const NetworkContact = (props) => {

	return (
		<div className={`network-contact-container`} onClick={() => props.handleSelectContact(props.contact.id)}>	 
			<Link to={`/profiles/${props.contact.id}`} >
				{props.contact.handle}	
			</Link>		
		</div>
	)
}

export default NetworkContact;