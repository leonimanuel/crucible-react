import React from "react"
import { connect } from "react-redux"
import { showSelectedContact } from "../../actions/networkActions.js"

// import { connect } from 'getstream';

const ContactResult = (props) => {
	debugger
	return (
		<div 
			className={`contact-result-container`} 
			onClick={() => {
				 props.showSelectedContact(props.contact.id);
				 props.onContactSelect()
			}}
			>	 
				{props.contact.handle}
		</div>
	)
}


export default connect(null, { showSelectedContact })(ContactResult);