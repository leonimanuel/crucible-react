import React, { Component } from 'react';
import { connect } from "react-redux"

import { selectTopic } from "../../actions/topicsActions.js"
import { APP_NAME } from "../../constants"

import ConsoleTopicsList from "./ConsoleTopicsList.js"
import ConsoleFactsList from "./ConsoleFactsList.js"

class ConsoleWindow extends Component {
	componentWillUnmount() {
		// debugger
	}


	render() {
		console.log("rendering console window")
		
		const currentTopicParent = this.props.topics.find(t => t.id == this.props.parentTopic.parent_id)

		return (
			<div id="console-window">
				{
					this.props.topics.length
						?
					<React.Fragment>
						{this.props.parentTopic.parent_id ? <div id="topic-back-button" onClick={() => this.props.selectTopic(currentTopicParent)}>⬅ {currentTopicParent.name}</div> : null }
						{/*<div id="console-window-title">{this.props.parentTopic ? this.props.parentTopic.name : "NONE"}</div>*/}
								
							{this.props.parentTopic.name === "New" ? null 
								: <ConsoleTopicsList 
								topics={this.props.topics.filter(topic => topic.parent_id == this.props.parentTopic.id)} 
								parentId={this.props.parentTopic.id}/>
							}
							<ConsoleFactsList  />						
					</React.Fragment>
						:
					<div id="facts-prompt" className="sidenav-onboarding-prompt">Excerpts added to {APP_NAME}, either through the <a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1">chrome extension</a> or in-app, will appear here.</div>
				}
			</div>
		)			
	}
}

const mapStateToProps = state => {
	return {
		topics: state.topics.topics,
		parentTopic: state.topics.parentTopic
	}
}

export default connect(mapStateToProps, { selectTopic })(ConsoleWindow);




