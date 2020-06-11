import React, { Component } from 'react';
import "../components/console/console.css"

import rootURL from "../rootURL.js"
import { connect } from "react-redux"
import TopicMenu from "../components/console/TopicMenu.js"
import ConsoleWindow from "../components/console/ConsoleWindow.js"
import { addTopics } from "../actions/users.js"

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

    fetch(rootURL() + `/topics`, configObj)
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
				<TopicMenu topics={this.props.topics} />
				{this.props.parentTopic ? <ConsoleWindow /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    topics: state.topics,
    parentTopic: state.parentTopic
  }
}

export default connect(mapStateToProps, { addTopics })(Console);




