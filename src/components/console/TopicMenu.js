import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"

class TopicMenu extends Component {
	render() {
		return (
			<div id="console-topic-menu-container">
				<div id="console-topics-container">
					{this.props.topics ? <ConsoleTopicsList topics={this.props.topics} /> : null} 
				</div>
				{/*<div>collect facts with the <a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank">Crucible chrome extension</a></div>*/}
				<a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank"><button id="extension-link-button">Collect New Facts</button></a>
			</div>
		)
	}
}


export default connect(state => ({topics: state.topics.topics}))(TopicMenu);




