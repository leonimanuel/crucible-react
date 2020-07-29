import { API_ROOT } from "../constants"

// export const loadGroups = (groups) => {
// 	console.log("loading groups")
// 	return {
// 		type: "LOAD_GROUPS",
// 		groups
// 	}
// }

export const setSelectedGroup = (group) => {
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

export const fetchDiscussion = (groupName, discussionName) => {
	// debugger
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
    fetch(API_ROOT + `/groups/${groupName}/discussions/${discussionName}`, configObj)
      .then(resp => resp.json())
      .then((discussionData) => {
        debugger
        dispatch({ 
					type: 'ADD_DISCUSSION_AND_COMMENTS', 
					discussionData
				})

        const members = discussionData.members
        dispatch({
          type: "ADD_MEMBERS_FOR_GUEST",
          members
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
    fetch(API_ROOT + `/users`, configObj)
      .then(resp => resp.json())
      .then((members) => {
				// debugger
				dispatch({ 
					type: 'ADD_MEMBER_SUGGESTIONS', 
					members
				})
     })
      .catch(err => alert(err.message))
	}
}

export const addNewGroup = (groupName, members) => {
	return (dispatch) => {
    let memberIds = members.map(member => member.id)

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
    fetch(API_ROOT + `/groups`, configObj)
      .then(resp => resp.json())
      .then((group) => {
				debugger
        dispatch({ 
					type: 'ADD_GROUP', 
					group
				})
     })
      .catch(err => alert(err.message))
	}
}

export const editGroup = (groupId, groupName, addedMembers, removedMembers) => {
  return (dispatch) => {
    let addedMemberIds = addedMembers.map(member => member.id)
    let removedMemberIds = removedMembers.map(member => member.id)

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        groupName: groupName,
        addedMemberIds: addedMemberIds,
        removedMemberIds: removedMemberIds
      })
    }
    // debugger
    fetch(API_ROOT + `/groups/${groupId}`, configObj)
      .then(resp => resp.json())
      .then((group) => {
        dispatch({ 
          type: 'UPDATE_GROUP', 
          group
        })
     })
      .catch(err => alert(err.message))
  }  
}




