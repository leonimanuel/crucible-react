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
      	article_url: "https://www.sciencemag.org/news/2020/06/deep-sea-currents-are-behind-ocean-s-thickest-piles-microplastics"
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
			<div id="group-discussions-list">
				<div>Discussions</div>
				<div onClick={this.handleNewDiscussion} id="new-discussion-button">NEW DIS</div>
				<div>
					{this.props.group.discussions.map(discussion => <DiscussionItem key={discussion.id} discussion={discussion}/>)}
				</div>
			</div>
		)
	}
}


export default connect(null, { updateGroupDiscussions })(DiscussionsList);




