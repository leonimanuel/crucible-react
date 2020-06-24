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
					debugger

				dispatch({ 
					type: 'ADD_DISCUSSION', 
					discussionData
				})
     })
      .catch(err => alert(err.message))
	}
}

export const fetchUsers = (value) => {
	// debugger
	return (dispatch) => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        searchVal: value
      }
    }
    // debugger
    fetch(rootURL() + `/users`, configObj)
      .then(resp => resp.json())
      .then((users) => {
				// debugger
				dispatch({ 
					type: 'ADD_USERS', 
					users
				})
     })
      .catch(err => alert(err.message))
	}
}

export const addNewGroup = (groupName, members) => {
	return (dispatch) => {
    let memberIds = members.map(member => member.id)
    debugger

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
			body: JSON.stringify({
				groupName: groupName,
				memberIds: memberIds
			})
    }
    // debugger
    fetch(rootURL() + `/groups`, configObj)
      .then(resp => resp.json())
      .then((group) => {
				// debugger
				dispatch({ 
					type: 'ADD_GROUP', 
					group
				})
     })
      .catch(err => alert(err.message))
	}
}


