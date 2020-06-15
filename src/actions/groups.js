import rootURL from "../rootURL.js"

export const loadGroups = (groups) => {
	console.log("loading groups")
	return {
		type: "LOAD_GROUPS",
		groups
	}
}

export const setSelectedGroup = group => {
	console.log("dispatching set details to true")
	return {
		type: "SET_SELECTED_GROUP",
		group
	}
} 

export const updateGroupDiscussions = discussion => {
	return {
		type: "UPDATE_GROUP_DISCUSSIONS",
		discussion
	}
}

export const fetchDiscussion = (groupId, discussionId) => {
	return (dispatch) => {
		dispatch({type: "LOADING_DISCUSSION"})
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    // debugger
    fetch(rootURL() + `/groups/${groupId}/discussions/${discussionId}`, configObj)
      .then(resp => resp.json())
      .then((discussionData) => {
				dispatch({ 
					type: 'ADD_DISCUSSION', 
					discussionData
				})
     })
      .catch(err => alert(err.message))
	}
}