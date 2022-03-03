import React, { useState, useEffect } from "react"
import { API_ROOT } from '../../constants';

import ContactResult from "./ContactResult.js"

const NetworkModal = (props) => {
	const [stateInput, setStateInput] = useState("")
	const [stateRecommendations, setStateRecommendations] = useState([])
	const [stateSearchResults, setStateSearchResults] = useState([])


  useEffect(() => {
    const fetchRecommendations = async () => {
	    let configObj = {
	      method: 'GET',
	      headers: {
	        "Content-Type": "application/json",
	        Accept: "application/json",
	        Authorization: localStorage.getItem("token")
	      }
	    }
	    
	    try {
	    	let response = await fetch(`${API_ROOT}/contacts/recommendations`, configObj)
	    	if (response.status == 200) {
	    		let members = await response.json()
	    		setStateRecommendations(members)
	    	}
	    } catch (error) {
	    	console.log(error)
	    }
    }

    fetchRecommendations()
    
    	// .then(resp => resp.json())
    	// .then(contacts => {
    	// 	setStateSearchResults(contacts)
    	// })    
  }, []);


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

	    <div id="network-recommendations">
	    	<h3>{stateRecommendations.length ? "Recommendations" : ""}</h3>
	    	{stateRecommendations.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    </div>

	    <div id="network-search-results">
	    	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
	    	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    </div>
		</div>
	)
}

export default NetworkModal;





























