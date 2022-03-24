import { API_ROOT } from "../../constants"
import React, { useState } from 'react';
// import { COUNTRIES } from './countries';
import './network.scss';
import { WithContext as ReactTags } from 'react-tag-input';

// const suggestions = COUNTRIES.map(country => {
//   return {
//     id: country,
//     text: country
//   };
// });

const KeyCodes = {
  comma: 188,
  enter: 13
};

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagsContainer = (props) => {
  const [searchResults, setSearchResults] = React.useState([]);
  // const [tags, setTags] = React.useState([]);
  let tags = props.tags
  // const [currentSearchVal, setCurrentSearchVal] = React.useState("");
  let currentSearchVal = ""

	const handleInputChange = async searchVal => {
	  if (searchVal) {
		  let configObj = {
		    method: 'GET',
		    headers: {
		      "Content-Type": "application/json",
		      Accept: "application/json",
		      Authorization: localStorage.getItem("token")
		    }
		  }
			
			// setPrevSearchVal(searchVal);
			let prevSearchVal = searchVal
			// setCurrentSearchVal(searchVal)
			currentSearchVal = searchVal
  		
  		setTimeout(async () => {				
				if (currentSearchVal === prevSearchVal) {
				  try {
				  	let response = await fetch(`${API_ROOT}/contacts/search/${searchVal}?tags=true`, configObj);
				  	if (response.status == 200) {
				  		let contacts = await response.json()
				  		let suggestions = contacts.map(c => ({id: c.handle, text: c.handle, contact_id: c.id}))
				  		setSearchResults(suggestions);				  	
				  	}
				  } catch (error) {
				  	alert(error)
				  }
				} 
  		}, 1000)	 
	  }
	}

  const handleDelete = i => {
    // setTags(tags.filter((tag, index) => index !== i));
    props.updateTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    // setTags([...tags, tag]);
    props.updateTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    // setTags(newTags);
    props.updateTags(newTags)
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div className="tags-container">
      <div>
        <span>tag users:</span>
        <ReactTags
          tags={props.tags}
          suggestions={searchResults}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="top"
          autocomplete
          placeholder="notify peers about your post"
          autofocus={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
	// return {
	// 	contacts: state.network.
	// }
}

export default TagsContainer;