import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { API_ROOT } from '../../constants';

// import NetworkContact from "../network/NetworkContact.js"
import ContactResult from "../network/ContactResult.js"
import { loadGroupMembers, loadSelectedGroup, addUserToGroup } from "../../actions/groups.js"
import { setSearchedMembersFollowStatuses } from "../../actions/networkActions.js"

const GroupMembersModal = (props) => {
	const [stateInput, setStateInput] = useState("")
	const [stateSearchResults, setStateSearchResults] = useState([])  

  useEffect(() => {
    props.loadGroupMembers(props.group.id)
  }, []);	

	const handleChange = e => {
    e.persist()
    e.key === "Enter" ? handleSubmit(e) : setStateInput(e.target.value)
	}

	const handleSubmit = async e => {
    e.preventDefault();
    
    // props.fetchMemberSearches(stateInput)
    if (!stateInput) { setStateSearchResults([]) }
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
  		let response = await fetch(`${API_ROOT}/groups/${props.group.id}/members/search/${stateInput}`, configObj)
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

	let groupMemberIds = props.members.map(m => m.id)
	return (
		<div id="group-members-popup" className="modal">
	    <form id="group-member-search-form" onSubmit={handleSubmit} className="search-form">
	      <input id="group-member-search-input" className="search-input" type="text" onChange={handleChange} value={stateInput} placeholder="search for members here" />
	      <input id="group-member-search-submit-button" className="search-submit-button" type="submit" value="search" />
	    </form>				

	    {
	    	<React.Fragment>
		    	<div id="group-member-recommendations" style={{display: stateSearchResults.length ? "none" : "block"}}>
			    	<h3>{props.members.length ? "All Group Members" : ""}</h3>
			    	{props.members.map(member => <ContactResult contact={member} context="group" admin={member.id === props.group.admin.id}/>)}
			    </div>

			    <div id="group-member-search-results">
			    	<h3>{stateSearchResults.length ? "Search Results" : ""}</h3>
			    	{stateSearchResults.map(searchMember => {
			    		
			    		return (
								<div className="group-member-search-result-wrapper">
									<ContactResult contact={searchMember} context="group" admin={searchMember.id === props.group.admin.id}/>
									{groupMemberIds.includes(searchMember.id) ? <span>member</span> : <button onClick={() => props.addUserToGroup(props.group.id, searchMember.id)}>invite</button> }
								</div>
		    			)
			    	})}
			    </div>	    	
	    	</React.Fragment>
	  	}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		members: state.groups.selectedGroupMembers
		// members: state.groups.allMembers.filter(m => m.group_id == state.groups.selectedGroupId)
	}
}

export default connect(mapStateToProps, { loadGroupMembers, loadSelectedGroup, setSearchedMembersFollowStatuses, addUserToGroup })(GroupMembersModal);




