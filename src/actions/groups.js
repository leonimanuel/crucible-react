import { API_ROOT } from "../constants"

// export const loadGroups = (groups) => {
// 	console.log("loading groups")
// 	return {
// 		type: "LOAD_GROUPS",
// 		groups
// 	}
// }

export const setSelectedGroup = groupId => {
	console.log("dispatching set details to true")
	// debugger
  return {
		type: "SET_SELECTED_GROUP",
		groupId
	}
} 

export const updateGroupDiscussions = discussion => {
	return {
		type: "UPDATE_GROUP_DISCUSSIONS",
		discussion
	}
}

export const fetchDiscussion = (groupName, discussionName) => {
	debugger
  return (dispatch) => {
		// dispatch({type: "LOADING_DISCUSSION"})
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    fetch(API_ROOT + `/groups/${groupName}/discussions/${discussionName}`, configObj)
      .then(resp => resp.json())
      .then((discussionData) => {
			debugger

				dispatch({ 
					type: 'ADD_DISCUSSION_AND_COMMENTS', 
					discussionData
				})

        // let comments = discussionData.comments
        // dispatch({
        //   type: "ADD_COMMENTS",
        //   comments
        // })
     })
      .catch(err => alert(err.message))
    debugger
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
					type: 'ADD_MEMBERS', 
					members
				})
     })
      .catch(err => alert(err.message))
	}
}

export const addNewGroup = (groupName, members) => {
	return (dispatch) => {
    let memberIds = members.map(member => member.id)
    // debugger

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
				// debugger
				dispatch({ 
					type: 'ADD_GROUP', 
					group
				})
     })
      .catch(err => alert(err.message))
	}
}

// export const calculateUnreadMessages = (discussions) => {
//   let unreadMessageArray = discussions.map(discussion => parseInt(discussion.unread_messages_count))
//   const reducer = (accumulator, currentValue) => accumulator + currentValue;
//   let groupUnreadCount = unreadMessageArray.reduce(reducer)
  
//   return {
//     type: "ADD_UNREAD_MESSAGES_COUNT",
//     groupUnreadCount
//   } 
// }
