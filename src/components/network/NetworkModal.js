import React, { useState } from "react"
import { API_ROOT } from '../../constants';

import ContactResult from "./ContactResult.js"

const NetworkModal = (props) => {
	const [stateInput, setStateInput] = useState("")
	const [stateSearchResults, setStateSearchResults] = useState([])

	const handleChange = e => {
    e.persist()
    e.key === "Enter" ? handleSubmit(e) : setStateInput(e.target.value)
	}

	const handleSubmit = e => {
    e.preventDefault();
    
    if (stateInput) {
	    let configObj = {
	      method: 'GET',
	      headers: {
	        "Content-Type": "application/json",
	        Accept: "application/json",
	        Authorization: localStorage.getItem("token")
	      }
	    }
	    fetch(`${API_ROOT}/contacts/search/${stateInput}`, configObj)
	    	.then(resp => resp.json())
	    	.then(contacts => {
	    		setStateSearchResults(contacts)
	    	})
    }
	}

	return (
		<div id="network-modal-container">
	    <form id="network-search-form" onSubmit={handleSubmit}>
	      <input id="network-search-input" type="text" onChange={handleChange} value={stateInput} placeholder="search for members here" required />
	      <input id="network-search-submit-button" type="submit" value="search" />
	    </form>

	    <div id="network-search-results">
	    	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    </div>
		</div>
	)
}

export default NetworkModal;