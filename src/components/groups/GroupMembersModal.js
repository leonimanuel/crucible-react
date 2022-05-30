import React, { Component } from 'react';
import { connect } from "react-redux"

// import NetworkContact from "../network/NetworkContact.js"
import ContactResult from "../network/ContactResult.js"
import { loadGroupMembers, loadSelectedGroup } from "../../actions/groups.js"

class GroupMembersModal extends Component {
	componentDidMount() {
		this.props.loadGroupMembers(this.props.group.id)
	}

	render() {
		return (
			<div id="new-group-popup" className="modal">
				{this.props.members.map(member => <ContactResult contact={member}/>)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		members: state.groups.allMembers.filter(m => m.group_id == state.groups.selectedGroupId)
	}
}

export default connect(mapStateToProps, { loadGroupMembers, loadSelectedGroup })(GroupMembersModal);




