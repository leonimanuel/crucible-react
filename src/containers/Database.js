import React, { Component } from 'react';
import { connect } from "react-redux"
import { API_ROOT } from "../constants"
import "./database.css"

import ConsoleFact from "../components/console/ConsoleFact.js"

class Database extends Component {
	state = {
		facts: [],
		searchVal: ""
	}

	componentDidMount() {
		this.getFacts()
	}

	handleChange = (e) => {
		this.setState({
			searchVal: e.target.value
		}, this.getFacts())
	}

	getFacts = () => {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      }, 
      body: JSON.stringify({
        searchVal: this.state.searchVal,
      })
    }
    // debugger
    fetch(API_ROOT + `/fact-search`, configObj)
      .then(resp => resp.json())
      .then((facts) => {
				debugger
				this.setState({facts: facts})
     })
      .catch(err => alert(err.message))		
	}

	showFacts = () => {
		return this.state.facts.map(fact => {
			
			return (
				<div className="database-fact">{fact.content}</div>
			)
		})
	}

	render() {
    let blob = document.getElementById("blob")
    if (blob) blob.style.display = "none"   		
		return (
			<div id="database-wrapper">
				<div id="database-header">Crucible Fact Database</div>
				<div><b>Search Facts: </b><input type="text" value={this.state.searchVal} onChange={this.handleChange}/></div>
				<div id="database-facts-wrapper">
					{this.showFacts()}
				</div>
			</div>
		)
	}
};

const mapStateToProps = state => {
	return  {
		parentTopic: state.topics.parentTopic || state.topics.topics.find(topic => topic.name === "New"),
	}
}


export default connect(mapStateToProps)(Database);