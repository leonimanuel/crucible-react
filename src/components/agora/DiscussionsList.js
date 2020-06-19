import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "./DiscussionItem.js"
import rootURL from "../../rootURL.js"
import { updateGroupDiscussions } from "../../actions/groups.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsList extends Component {
	handleNewDiscussion = () => {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }, 
      body: JSON.stringify({
      	article_url: "https://www.scientificamerican.com/article/why-do-people-avoid-facts-that-could-help-them/"
      })
    }

    fetch(rootURL() + `/groups/${this.props.group.id}/discussions`, configObj)
      .then(resp => resp.json())
      .then((data) => {
				this.props.updateGroupDiscussions(data)
				// this.props.loadGroups(groupsData)
     })
      .catch(err => alert(err.message))
	}

	render() {
		// debugger
		return (
			<div id="group-discussions-list" className="sidenav-list">
				<div className="list-title">Discussions</div>
				<div onClick={this.handleNewDiscussion} id="new-discussion-button">NEW DIS</div>
				<div>
					{this.props.group.discussions.map(discussion => <DiscussionItem key={discussion.id} discussion={discussion}/>)}
				</div>
			</div>
		)
	}
}


export default connect(null, { updateGroupDiscussions })(DiscussionsList);




