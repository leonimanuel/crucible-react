import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"
import GroupsList from "./GroupsList.js"
import rootURL from "../../rootURL.js"
import { loadGroups } from "../../actions/groups.js"

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
				debugger
				this.props.loadGroups(groupsData)
     })
      .catch(err => alert(err.message))
	}

	render() {
		// debugger
		return (
			<div id="agora-menu">
				<div className="">Agora</div>
				<div id="groups-list">
					{this.props.groups ? <GroupsList groups={this.props.groups}/> : null} 
				</div>
			</div>
		)
	}
}


export default connect(state => ({groups: state.sidenav.groups}), { loadGroups })(AgoraMenu);




