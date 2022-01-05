import React, { Component } from 'react';
import "../components/console/console.css"

import { API_ROOT } from "../constants"
import { connect } from "react-redux"
import TopicMenu from "../components/console/TopicMenu.js"
import ConsoleWindow from "../components/console/ConsoleWindow.js"
// import { addTopics } from "../actions/topicsActions.js"

class Console extends Component {
  componentDidMount() {
  	console.log("Console did mount")
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(API_ROOT + `/topics`, configObj)
      .then(resp => resp.json())
      .then((data) => {
				console.log(data)
				this.props.addTopics(data)
      })
      .catch(err => err.message)
  } 
  
	render() {
		// this.fetchFacts()
		return (
			<div id="console-container">
				<TopicMenu topics={this.props.topics}/>
				<ConsoleWindow />
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    topics: state.topics.topics,
    // parentTopic: state.parentTopic
  }
}

export default connect(mapStateToProps, )(Console);




