import React, { Component } from 'react';
import { connect } from "react-redux"
import ReactDOM from "react-dom"
import { createPopper } from "@popperjs/core"

// import ConsoleTopic from "./ConsoleTopic.js"
import GroupsList from "./GroupsList.js"
import rootURL from "../../rootURL.js"
import { loadGroups } from "../../actions/groups.js"
import NewGroupPopup from "./NewGroupPopup.js"

class AgoraMenu extends Component {
	componentDidMount() {
    console.log("mounted agora side-menu")
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(rootURL() + `/groups`, configObj)
      .then(resp => resp.json())
      .then((groupsData) => {
				// debugger
				this.props.loadGroups(groupsData)
     })
      .catch(err => alert(err.message))
	}

	handleNewGroup = () => {
		let wrapper = document.querySelector("#popup-container")
		ReactDOM.render(<NewGroupPopup />, wrapper, () => console.log("rendered new group popup"))
		let button = document.querySelector("#new-group-button");
		let popup = document.querySelector("#new-group-popup")
		debugger

		createPopper(button, popup, {
		  placement: 'right',
		});


	}

	render() {
		// debugger
		return (
			<div id="agora-menu">
				<div className="">Agora</div>
				<div id="groups-list">
					{this.props.groups ? <GroupsList groups={this.props.groups} createGroup={this.handleNewGroup}/> : null} 
				</div>
				<div id="popup-container"></div>
			</div>
		)
	}
}


export default connect(state => ({groups: state.sidenav.groups}), { loadGroups })(AgoraMenu);




