import React, { Component } from 'react';
// import { connect } from "react-redux"

class newGroupPopup extends Component {
	render() {
		return (
			<div id="new-group-popup">
				<form id="new-group-form">
					Article link: <input type="text"/> <br/>
					Members: <input type="text"/> <br/>
					Group Name (optional): <input type="text"/>
					<input type="submit" value="Create Group"/>
				</form>
			</div>
		)
	}
}


export default newGroupPopup;




