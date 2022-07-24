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
import SearchGroupsModal from "./SearchGroupsModal.js"

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
					<div className="list-title-wrapper">
						<div id="groups-list-title" className="list-title">Groups</div>					
					</div>	
				  <Popup 
				  	trigger={ <div className="form-action-button">New Private Group</div>} 
				  	position="center" 
				  	modal
			  	>
			    	{ close => <GroupsModal 
			    			handleGroupAdded={() => close()}
			    			closePopup={() => close()} 
			    		/> 
			    	}
				  </Popup>			
					{/*<div className="search-button">	 
					  <Popup trigger={<div id="groups-menu-header">Find Groups</div>} position="center" modal>
					    { close => <SearchGroupsModal handleGroupSelect={() => close()} /> }
					  </Popup>								
					</div>*/}

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




