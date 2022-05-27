import React, { Component } from 'react';
import { connect } from "react-redux"
// import ReactDOM from "react-dom"
import { createPopper } from "@popperjs/core"

// import ConsoleTopic from "./ConsoleTopic.js"
import GroupsList from "./GroupsList.js"
// import { API_ROOT } from "../../constants"
// import { fetchUsers } from "../../actions/groups.js"
import NewGroupPopup from "./NewGroupPopup.js"

class AgoraMenu extends Component {
	state = {
		renderNewGroupPopup: false
	}

	handleNewGroup = () => {		
		this.setState({
			renderNewGroupPopup: true
		}, () => {
			let button = document.querySelector("#new-group-button");
			let popup = document.querySelector("#new-group-popup")
			createPopper(button, popup, {
			  placement: 'right',
			  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
			});			
		})
	}

	closePopup = () => {
		this.setState({...this.state, renderNewGroupPopup: false})
	}

	render() {
		console.log(this.props.groups)
		return (
			<div id="agora-menu">
				<div id="groups-list" className="sidenav-list">
					{this.props.groups 
						? 
							<GroupsList 
								groups={this.props.groups} 
								createGroup={this.handleNewGroup} 
							/> 
						: null
					} 
				</div>
				{this.state.renderNewGroupPopup ? <NewGroupPopup closePopup={this.closePopup} /> : null}
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

export default connect(mapStateToProps)(AgoraMenu);




