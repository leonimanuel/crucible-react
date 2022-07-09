import React from "react"
import { connect } from "react-redux"
// import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

// import { connect } from 'getstream';


const NetworkContact = (props) => {

  const nextPath = (path) => {
    props.history.push(path);
  }

	return (
		<div className={`network-contact-container detail-item-container`} onClick={() => nextPath(`/profiles/${props.contact.id}`)}>	 
				{props.contact.handle}	
		</div>
	)
}

export default withRouter(NetworkContact);