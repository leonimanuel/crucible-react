import React, { Component } from 'react';
import "./groups.scss"
import { connect } from "react-redux"
// import ReactDOM from "react-dom"
// import { createPopper } from "@popperjs/core"

// import ConsoleTopic from "./ConsoleTopic.js"
import GroupsList from "./GroupsList.js"
import AddListItemButton from "./AddListItemButton.js"
// import { API_ROOT } from "../../constants"
// import { fetchUsers } from "../../actions/groups.js"
import GroupsModal from "./GroupsModal.js"

import { loadGroups } from "../../actions/groups.js"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class GroupsMenu extends Component {
	componentDidMount() {
		this.props.loadGroups()
	}

	state = {
		renderNewGroupPopup: false
	}

	handleNewGroup = () => {		
		// this.setState({
		// 	renderNewGroupPopup: true
		// }, () => {
		// 	let button = document.querySelector("#new-group-button");
		// 	let popup = document.querySelector("#new-group-popup")
		// 	createPopper(button, popup, {
		// 	  placement: 'right',
		// 	  modifiers: [
		// 	    {
		// 	      name: 'offset',
		// 	      options: {
		// 	        offset: [0, 8],
		// 	      },
		// 	    },
		// 	  ],
		// 	});			
		// })
	}

	closePopup = () => {
		this.setState({...this.state, renderNewGroupPopup: false})
	}

	render() {
		console.log(this.props.groups)
		return (
			<div id="groups-menu">
				<div id="groups-list" className="sidenav-list">
					<div id="new-group-button" className="list-title-wrapper">
						<div id="groups-list-title" className="list-title">Groups</div>
						<div id={`actual-new-group-button`}>	 
						  <Popup 
						  	trigger={
									<div id="groups-modal-button" className="plus-button-box">
										<svg className="plus-button-svg" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg" style={{fill: "black"}}><path className="plus-button-path" d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"/></svg>			
									</div>
						  	} 
						  	position="center" 
						  	modal
					  	>
					    	{ close => <GroupsModal 
					    			handleGroupAdded={() => close()} 
					    			closePopup={() => close()} 
					    		/> 
					    	}
						  </Popup>								
						</div>
					</div>					
					{this.props.groups 
						? 
							<GroupsList 
								groups={this.props.groups} 
								createGroup={this.handleNewGroup} 
							/> 
						: null
					} 
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		groups: state.groups.allGroups,
		members: state.groups.allMembers
	}
}

export default connect(mapStateToProps, { loadGroups })(GroupsMenu);




