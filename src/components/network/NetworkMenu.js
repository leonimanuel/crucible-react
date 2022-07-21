import React, { useState, useEffect } from "react"
import "./network.scss"
import { connect } from "react-redux"
import { fetchContacts, showSelectedContact, clearRecommendationsAndSearches } from "../../actions/networkActions.js"
import { APP_NAME } from "../../constants"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import NetworkContact from "./NetworkContact.js"
import NetworkModal from "./NetworkModal.js"

// import Notification from "./Notification.js"

const NetworkMenu = (props) => {
	const [stateMounted, setStateMounted] = useState(false);
	const [stateNetworkOption, setStateNetworkOption] = useState("following")

	useEffect(() => {
		// if (!props.networkContacts && !stateMounted) { // if there are no notifications already stored
		if (!stateMounted) { // if there are no notifications already stored
			console.log("FETCHING CONTACTS")
			
			if (props.userId) {props.fetchContacts(stateNetworkOption)} 

			setStateMounted(true) // SUPER IMPORTANT TO AVOID INFINITE API CALLS
		}
	})



	const handlePresentContact = (contactId) => {
		// alert(contactId)
		// props.showSelectedContact(contactId)
	}
	
	
	const selectNetworkOption = (e) => {
		setStateNetworkOption(e.target.dataset.type)
		props.fetchContacts(e.target.dataset.type)
		// if (!selectedContacts.length) {
		// 	debugger
		// 	props.fetchContacts(e.target.dataset.type)
		// }
	}

	const selectedContacts = stateNetworkOption == "following" ? props.followingContacts : props.followersContacts
	return (
		<div id="network-menu-container">
			{/*<div id="network-menu-header-wrapper">
							Network	
						</div>*/}
			<div id="network-options">
				<div className={`network-option ${stateNetworkOption == "following" ? "selected" : ""}`} data-type="following" id="following-network-option" onClick={selectNetworkOption}>Following</div>
				<div className={`network-option ${stateNetworkOption == "followers" ? "selected" : ""}`} data-type="followers" id="followers-network-option" onClick={selectNetworkOption}>Followers</div>
			</div>
			
			<div id={`search-crucible-network-button`} className="search-button">	 
			  <Popup trigger={<div id="network-menu-header">Search {APP_NAME} Network</div>} position="center" modal>
			    { close => <NetworkModal handleContactSelect={() => close()} /> }
			  </Popup>								
			</div>

			<div id="network-cards-wrapper">
				{selectedContacts.length ? 
					selectedContacts.map((nc, index) => <NetworkContact contact={nc} key={index} index={index} handleSelectContact={handlePresentContact} />) 
					
					: stateNetworkOption == "following" ?					
					<div id="following-prompt" className="sidenav-onboarding-prompt">
						Use the search button above to find Crucible members whose activity you want to follow.
					</div>
					:
					<div id="followers-prompt" className="sidenav-onboarding-prompt">
						Users that follow your activity will apear here.
					</div>					
				}
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		// notification_groups: state.notifications.notification_groups,
		followingContacts: state.network.followingContacts,
		followersContacts: state.network.followersContacts,
		userId: state.users.userId
	}
}

export default connect(mapStateToProps, { fetchContacts, showSelectedContact, clearRecommendationsAndSearches })(NetworkMenu);