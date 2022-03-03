import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { showSelectedContact } from "../../actions/networkActions.js"


// import { connect } from 'getstream';

const ContactResult = (props) => {
	return (
		<div 
			className={`contact-result-container`} 
			onClick={() => {
				 props.showSelectedContact(props.contact.id);
				 props.onContactSelect()
			}}
			>	 
			<Link to={`/profiles/${props.contact.id}`} >
				{props.contact.handle}	
			</Link>				
		</div>
	)
}


export default connect(null, { showSelectedContact })(ContactResult);