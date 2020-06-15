import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "./DiscussionItem.js"
import rootURL from "../../rootURL.js"
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
      	article_url: "https://theintercept.com/2020/06/13/george-floyds-murder-may-finally-end-the-armys-fealty-to-defeated-confederate-traitors/"
      })
    }

    fetch(rootURL() + `/groups/${this.props.group.id}/discussions`, configObj)
      .then(resp => resp.json())
      .then((data) => {
				console.log(data)
				// this.props.loadGroups(groupsData)
     })
      .catch(err => alert(err.message))
	}

	render() {
		return (
			<div id="group-discussions-list">
				<div>Discussions</div>
				<div onClick={this.handleNewDiscussion} id="new-discussion-button">NEW DIS</div>
				<div>
					{this.props.discussions.map(discussion => <DiscussionItem key={discussion.id} discussion={discussion}/>)}
				</div>
			</div>
		)
	}
}


export default connect()(DiscussionsList);




