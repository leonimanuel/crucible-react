import React, { Component } from 'react';
import { API_ROOT } from "../../constants"
import { connect } from "react-redux"
import { fetchInterests } from "../../actions/discussionsActions.js"

import SelectSearch from "react-select-search"

class IntelControl extends Component {
	state = {
		name: "",
		description: "",
		organization: "",
		url: "",
		interests: []
	}

	componentDidMount() {
		this.props.fetchInterests()
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}) 
	}

	handleCategorySelection = (e) => {
		const interest = e
		if (!this.state.interests.includes(e)) {
			this.setState({interests: [...this.state.interests, e]})	
		}
	}

	removeInterest = (interest) => {
		this.setState({interests: this.state.interests.filter(i => i !== interest)})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		debugger
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
	      Authorization: localStorage.getItem("token")				
			},
			body: JSON.stringify({
				name: this.state.name,
				description: this.state.description,
				organization: this.state.organization,
				url: this.state.url,
				interests: this.state.interests
			})
		}

		fetch(API_ROOT + "/briefings", configObj)		
	}

	render() {  		
		const options = this.props.interests.map(interest => {
			return {
				name: interest.title,
				value: interest.title
			}
		})

		return (
			<div id="intel-control-wrapper">
				<form id="intel-form" onSubmit={this.handleSubmit}>
					<label className="intel-label" htmlFor="name">Name</label>
					<input className="intel-input" type="type" name="name" onChange={this.handleChange} value={this.state.name}/>

					<label className="intel-label" htmlFor="description">Description</label>
					<textarea className="intel-input" name="description" id="" cols="30" rows="10" onChange={this.handleChange} value={this.state.description}></textarea>

					<label className="intel-label" htmlFor="organization" onChange={this.handleChange} value={this.state.source}>Organization</label>
					<input className="intel-input" type="text" name="organization" onChange={this.handleChange} value={this.state.organization}/>
					
					<label className="intel-label" htmlFor="url">Link</label>
					<input className="intel-input" type="url" name="url" onChange={this.handleChange} value={this.state.url}/>

			    <SelectSearch
			        className="select-search"
			        name="category"
			        onChange={this.handleCategorySelection}
			        options={options}
			        search
			        placeholder="Select your country"
			    />
			    {this.state.interests.map(interest => {
			    	return(
							<div className="member-tag">
								{interest}
								<div className="remove-member-button" onClick={() => this.removeInterest(interest)}>   X</div>
							</div>							
		    		)
			    })}
					
					<input type="submit" value="create intel"/>
				</form>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		interests: state.discussions.allInterests
	}
}

export default connect(mapStateToProps, { fetchInterests })(IntelControl);



