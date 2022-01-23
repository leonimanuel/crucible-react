import React from "react"
import { connect } from "react-redux"
// import { connect } from 'getstream';


const NetworkContact = (props) => {

	return (
		<div className={`network-contact-container`} onClick={() => props.handleSelectContact(props.contact.id)}>	 
			{props.contact.handle}
		</div>
	)
}

export default NetworkContact;