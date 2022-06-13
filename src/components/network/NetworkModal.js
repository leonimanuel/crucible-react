import React, { useState, useEffect } from "react"
import { API_ROOT } from '../../constants';
import { connect } from "react-redux"

import { fetchMemberRecommendations, setSearchedMembersFollowStatuses } from "../../actions/networkActions.js"

import ContactResult from "./ContactResult.js"

const NetworkModal = (props) => {
	const [stateInput, setStateInput] = useState("")
	const [stateRecommendations, setStateRecommendations] = useState([])
	const [stateSearchResults, setStateSearchResults] = useState([])


  useEffect(() => {

    // fetchRecommendations()
    props.fetchMemberRecommendations()
    	// .then(resp => resp.json())
    	// .then(contacts => {
    	// 	setStateSearchResults(contacts)
    	// })    
  }, []);


	const handleChange = e => {
    e.persist()
    e.key === "Enter" ? handleSubmit(e) : setStateInput(e.target.value)
	}

	const handleSubmit = async e => {
    e.preventDefault();
    
    // props.fetchMemberSearches(stateInput)

    // if (stateInput) {
	  let configObj = {
	    method: 'GET',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  
	  try {
  		let response = await fetch(`${API_ROOT}/contacts/search/${stateInput}`, configObj)
	  	if (response.status == 200) {
	  		let members = await response.json()

				let searchedMembersFollowStatuses = members.map(member => {
					return {memberId: member.id, isFollowing: member.is_following}
				})

				setStateSearchResults(members)
				props.setSearchedMembersFollowStatuses(searchedMembersFollowStatuses)

	  	}
	  } catch (error) {
	  	console.log(error)
	  } 
    // }
	}

	return (
		<div id="network-modal-container" className="modal-container">
	    <form id="network-search-form" onSubmit={handleSubmit} className="search-form">
	      <input id="network-search-input" className="search-input" type="text" onChange={handleChange} value={stateInput} placeholder="search for members here" required />
	      <input id="network-search-submit-button" className="search-submit-button" type="submit" value="search" />
	    </form>

    	<React.Fragment>
	    	<div id="network-recommendations" className="modal-search-results-wrapper">
		    	<h3>{props.recommendedMembers.length ? "Recommendations" : ""}</h3>
		    	{props.recommendedMembers.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
		    </div>

		    <div id="network-search-results" className="modal-search-results-wrapper">
		    	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
		    	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
		    </div>	    	
    	</React.Fragment>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		recommendedMembers: state.network.recommendedMembers,
		searchedMembers: state.network.searchedMembers
	}
}

export default connect(mapStateToProps, { fetchMemberRecommendations, setSearchedMembersFollowStatuses })(NetworkModal);






	    // <div id="network-recommendations">
	    // 	<h3>{stateRecommendations.length ? "Recommendations" : ""}</h3>
	    // 	{stateRecommendations.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>

	    // <div id="network-search-results">
	    // 	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
	    // 	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>






















