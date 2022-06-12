import React, { useState, useEffect } from "react"
import { API_ROOT } from '../../constants';
import { connect } from "react-redux"

import { fetchMemberRecommendations, setSearchedMembersFollowStatuses } from "../../actions/networkActions.js"
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
  		let response = await fetch(`${API_ROOT}/groups/search/${stateInput}`, configObj)
	  	if (response.status == 200) {
	  		let groups = await response.json()

				// let searchedMembersFollowStatuses = members.map(member => {
				// 	return {memberId: member.id, isFollowing: member.is_following}
				// })

				setStateSearchResults(groups)
				// props.setSearchedMembersFollowStatuses(searchedMembersFollowStatuses)

	  	}
	  } catch (error) {
	  	console.log(error)
	  } 
    // }
	}

	return (
		<div id="network-modal-container" className="modal">
	    <form id="network-search-form" onSubmit={handleSubmit} className="search-form">
	      <input id="network-search-input" className="search-input" type="text" onChange={handleChange} value={stateInput} placeholder="search for members here" required />
	      <input id="network-search-submit-button" className="search-submit-button" type="submit" value="search" />
	    </form>



	    {
	    	<React.Fragment>
		    	<div id="network-recommendations">
			    	<h3>{props.recommendedGroups.length ? "Recommendations" : ""}</h3>
			    	{props.recommendedGroups.map(group => <GroupSearchResult group={group} onGroupSelect={props.handleGroupSelect} />)}
			    </div>

			    <div id="network-search-results">
			    	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
			    	{stateSearchResults.map(group => <GroupSearchResult group={group} onGroupSelect={props.handleGroupSelect} />)}
			    </div>	    	
	    	</React.Fragment>
	  	}



		</div>
	)
}

const mapStateToProps = state => {
	return {
		recommendedGroups: state.groups.recommendedGroups
	}
}

export default connect(mapStateToProps, { fetchMemberRecommendations, setSearchedMembersFollowStatuses, fetchGroupRecommendations })(SearchGroupsModal);






	    // <div id="network-recommendations">
	    // 	<h3>{stateRecommendations.length ? "Recommendations" : ""}</h3>
	    // 	{stateRecommendations.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>

	    // <div id="network-search-results">
	    // 	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
	    // 	{stateSearchResults.map(contact => <ContactResult contact={contact} onContactSelect={props.handleContactSelect} />)}
	    // </div>






















