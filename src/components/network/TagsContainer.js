import React, { Component } from "react";
import { connect } from "react-redux"

import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import { API_ROOT } from "../../constants"

const defaultOptions = [
			{ value: "apppple", label: "AppleT" }, 
			{ value: "google", label: "Google" }
		]

class TagsContainer extends Component {
	state = {
		typing: false
	}

	componentDidMount() {
		let input = document.getElementById("user-tag-selector").querySelector("input");
		input.addEventListener('keydown', (e) => {
	    console.log("typing set to true");
	    this.setState({typing: true})
	    
	    // https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
	    let timeout = ""
	    if (timeout) { 
	    	clearTimeout(timeout);
  		}
	    
	    timeout = setTimeout(() => {
        this.setState({typing: false})
        console.log("typing set to false");
	    }, 250);

		});		
	}

	filterOptions = (inputValue: string, searchOptions) => { //returns matching options
	  return searchOptions.filter(kw =>
	    kw.label.toLowerCase().includes(inputValue.toLowerCase())
	  );
	};

	promiseOptions = inputValue => //retrieves options from backend that match search string
	  new Promise(resolve => {
		  let configObj = {
		    method: "GET",
		    headers: {
		      "Content-Type": "application/json",
		      Accept: "application/json",
		      Authorization: localStorage.getItem("token")
		    }
		  }

		  let searchOptions = []		  

		  let previousValue = inputValue

		  let groupId = this.props.selectedGroupId
				// const currentInputVal = document.getElementById("user-tag-selector").children[1].children[0].children[0].children[0].children[0].value
				// if (currentInputVal === previousValue) {
				setTimeout(() => {
					if (!this.state.typing) {
					  console.log("FETCHING")
					  fetch(`${API_ROOT}/contacts/search/${inputValue}?tags=true${groupId ? `&group_id=${groupId}` : ""}`, configObj)
					    .then(resp => resp.json())
					    .then((contacts) => {
					      // debugger
					      // {id: c.handle, text: c.handle, contact_id: c.id}
					      if (contacts.length > 0) {
						      searchOptions = contacts.map(item => {
						      	return {label: item.handle, value: item.id, type: "user"}
						      })				      	
					      } else {
									// searchOptions = [{label: `no users found matching "${inputValue}"`, value: "request-user", type: "user"}]
									// searchOptions = []
					      }
					      console.log("calling filteroptions")
					      resolve(this.filterOptions(inputValue, searchOptions));
					    }) 
					}
				}, 500)
	});	

	render() {
    return (
	    <div className="tags-container">
		    <label>tag users</label>
		    <AsyncSelect
	      	id={"user-tag-selector"}
	      	className="select"
	      	key={`my_unique_select_key__`}
		      isMulti
		      value={this.props.tags}
		      onChange={(selections) => this.props.updateTags(selections)}
		      placeholder="User handle"
		      loadOptions={this.promiseOptions}
		    />		    	
	    </div>
  	)		
	}
}

export default TagsContainer;