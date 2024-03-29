import React, { useState, useEffect } from "react"
import { API_ROOT } from '../../constants';
import { connect } from "react-redux"

import { fetchGroupRecommendations } from "../../actions/groups.js"

import GroupSearchResult from "./GroupSearchResult.js"

const SearchGroupsModal = (props) => {
	const [stateInput, setStateInput] = useState("")
	const [stateRecommendations, setStateRecommendations] = useState([])
	const [stateSearchResults, setStateSearchResults] = useState([])


  useEffect(() => {
    props.fetchGroupRecommendations()
  }, []);


	const handleChange = e => {
    e.persist()
    e.key === "Enter" ? handleSubmit(e) : setStateInput(e.target.value)
	}

	const handleSubmit = async e => {
    e.preventDefault();

	  let configObj = {
	    method: 'GET',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  
	  try {
  		let response = await fetch(`${API_ROOT}/groups/search/${stateInput}`, configObj)
	  	if (response.status == 200) {
	  		let groups = await response.json()

				setStateSearchResults(groups)

	  	}
	  } catch (error) {
	  	console.log(error)
	  } 
    // }
	}

	return (
		<div id="groups-modal-container" className="modal-container">
	    <form id="groups-search-form" onSubmit={handleSubmit} className="search-form">
	      <input id="groups-search-input" className="search-input" type="text" onChange={handleChange} value={stateInput} placeholder="search for groups here" required />
	      <input id="groups-search-submit-button" className="search-submit-button" type="submit" value="search" />
	    </form>

    	<React.Fragment>
	    	{
	    		props.recommendedGroups.length && !stateSearchResults.length
	    			?
		    	<div id="groups-recommendations" className="modal-search-results-wrapper">
			    	<h3>Recommendations</h3>
			    	{props.recommendedGroups.map(group => <GroupSearchResult group={group} onGroupSelect={props.handleGroupSelect} />)}
			    </div>
			    	:
		    	null
	    	}

		    <div id="groups-search-results" className="modal-search-results-wrapper">
		    	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
		    	{stateSearchResults.map(group => <GroupSearchResult group={group} onGroupSelect={props.handleGroupSelect} />)}
		    </div>	    	
    	</React.Fragment>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		recommendedGroups: state.groups.recommendedGroups
	}
}

export default connect(mapStateToProps, { fetchGroupRecommendations })(SearchGroupsModal);






	    // <div id="network-recommendations">
	    // 	<h3>{stateRecommendations.length ? "Recommendations" : ""}</h3>
	    // 	{stateRecommendations.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>

	    // <div id="network-search-results">
	    // 	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
	    // 	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>






















