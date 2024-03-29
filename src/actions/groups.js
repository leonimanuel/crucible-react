import mixpanel from 'mixpanel-browser';
import { API_ROOT, STREAM_CLIENT_ID, STREAM_APP_ID } from "../constants"
import { markNotificationReadInStream } from "./notificationsActions.js"

// export const loadGroups = (groups) => {
// 	console.log("loading groups")
// 	return {
// 		type: "LOAD_GROUPS",
// 		groups
// 	}
// }

export const loadGroups = () => {
  return async (dispatch) => {
    // dispatch({"LOADING_GROUPS"})
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    try {
      let response = await fetch(`${API_ROOT}/groups`, configObj) 
      if (response.status == 200) {
        let groups = await response.json()
        dispatch({
          type: "LOAD_GROUPS",
          groups        
        })
      }
    } catch (error) {
      console.log(error)
    }  

  }  
}

export const loadSelectedGroup = (groupId, activityId, handleLoad, isLoggedIn, redirectToLogin) => {
  return async (dispatch) => {
    dispatch({
      type: "LOADING_SELECTED_GROUP"
    })

    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    // debugger
    const path = isLoggedIn ? "groups" : "groups_unauthenticated"
    try {
      let res = await fetch(API_ROOT + `/${path}/${groupId}?activityId=${activityId}`, configObj)
      if ((res.status == 200)) {
        let group_data = await res.json()
        dispatch({ 
          type: 'SET_SELECTED_GROUP', 
          group_data
        })

        const replies = group_data.feed_items.map(a => a.item.object.replies ? a.item.object.replies : null).flat().filter(r => !!r)
        dispatch(({
          type: "SET_REPLIES",
          replies: replies
        }))     
      } else if (res.status === 401) {
          redirectToLogin()
        // history.push("/login")
      }
      else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }    
    } catch (error) {
      alert(error)
    }

    if (handleLoad) {handleLoad()}
  }   
}

export const readGroupNotifications = (userId, notificationGroups, groupId) => {
  let notifications = notificationGroups.filter(ng => (ng.group_object.type ==  "Group" && ng.group_object.id == groupId) || (ng.group_object.type ==  "Comment" && ng.group_object.group == groupId))
  return (dispatch) => {
    if (notifications.length) {
      notifications.forEach(notification => {
        if (!notification.is_read) {
          let notificationGroupId = notification.id
          markNotificationReadInStream(userId, notificationGroupId)

          dispatch({
            type: "READ_NOTIFICATION",
            notificationGroupId
          });
        }
      })
    }
  }
}

export const loadGroupMembers = (groupId) => {
  return async (dispatch) => {
    dispatch({
      type: "LOADING_GROUP_MEMBERS"
    })
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    try {
      let members_res = await fetch(API_ROOT + `/groups/${groupId}/users`, configObj)
      if ((members_res.status == 200)) {
        let members = await members_res.json()
        dispatch({ 
          type: 'SET_SELECTED_GROUP_MEMBERS', 
          members: members,
          groupId: groupId
        })

        try {
          let followings_res = await fetch(API_ROOT + `/groups/${groupId}/followships`, configObj)
          if ((followings_res.status == 200)) {
            let memberFollowships = await followings_res.json();
            dispatch({
              type: "SET_GROUP_MEMBERS_FOLLOWING_STATUSES",
              memberFollowships
            })            
          } else {
            let error = await followings_res.json();
          }
        } catch (error) {
          alert(error)
        }
      } else {
        let error = await members_res.json()
        alert(`error: ${members_res.status}, ${error}`)
      }    
    } catch (error) {
      alert(error)
    }
  }     
}

export const joinGroup = (groupId) => {
  return async (dispatch) => {
    dispatch({
      type: "JOINING_SELECTED_GROUP"
    })

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    try {
      let res = await fetch(API_ROOT + `/groups/${groupId}/join-group`, configObj)
      if ((res.status == 201)) {
        mixpanel.track("Join Group", {
          group_id: groupId
        })  

        dispatch({ 
          type: 'JOIN_SELECTED_GROUP',
          groupId: groupId
        })
      } else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }    
    } catch (error) {
      alert(error)
    }
  }  
}

export const addUserToGroup = (groupId, newMemberId) => {
  return async (dispatch) => {
    dispatch({
      type: "ADDING_MEMBER_TO_GROUP"
    })

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    try {
      let res = await fetch(API_ROOT + `/groups/${groupId}/add-group-member/${newMemberId}`, configObj)
      if ((res.status == 201)) {
        let newMember = await res.json();
        dispatch({ 
          type: 'ADD_MEMBER_TO_GROUP',
          newMember
        })
      } else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }    
    } catch (error) {
      alert(error)
    }
  }  
}

// export const setSelectedGroup = (group) => {
//   return {
//     type: "SET_SELECTED_GROUP",
//     group
//   }    
// } 

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
        // debugger
        dispatch({ 
					type: 'ADD_DISCUSSION_AND_COMMENTS', 
					discussionData
				})

        // const members = discussionData.members
        // dispatch({
        //   type: "ADD_MEMBERS_FOR_GUEST",
        //   members
        // })
     })
      .catch(err => {
        alert(err.message)
      }) 
	}
}

export const fetchUsers = (value, members, addedUsers) => {
	// debugger
	return (dispatch) => {
    const memberIds = members.map(m => m.id)
    const userIds = addedUsers.map(u => u.id)
    debugger
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      }, 
      body: JSON.stringify({
        searchVal: value,
        memberIds: memberIds,
        addedUserIds: userIds
      })
    }
    // debugger
    fetch(API_ROOT + `/user-search`, configObj)
      .then(resp => resp.json())
      .then((members) => {
				// debugger
				dispatch({ 
					type: 'ADD_MEMBER_SUGGESTIONS', 
					members
				})
     })
      .catch(err => {
        alert(err.message)
      })
	}
}

export const addNewGroup = (groupName, members, isPrivate, closePopup) => {
	return async (dispatch) => {
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
				memberIds: memberIds,
        private: isPrivate
			})
    }
    // debugger
    try {
      let res = await fetch(API_ROOT + `/groups`, configObj)
      if ((res.status == 201)) {
        let group = await res.json()
        
        mixpanel.track("Create Group", {
          isPrivate: isPrivate,
          group_id: group.id
        })        

        dispatch({ 
          type: 'ADD_GROUP', 
          group
        })
        closePopup()
      }
      else if (res.status == 422) {
        let response = await res.json()
        alert(response.errors.join('\r\n'))        
      }
      else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }
    } catch (error) {
      alert(error)
    }
	}
}

export const fetchGroupRecommendations = (searchVal) => {
  return async (dispatch) => {
    dispatch({type: "FETCHING_MEMBER_RECOMMENDATIONS"})

    let configObj = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    
    try {
      let response = await fetch(`${API_ROOT}/groups/recommendations`, configObj) 
      if (response.status == 200) {
        let groups = await response.json()
        dispatch({
          type: "SET_GROUP_RECOMMENDATIONS",
          groups: groups
        })
      }
    } catch (error) {
      console.log(error)
    }  
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
      .catch(err => {
        alert(err.message)
      })
  }  
}

export const leaveGroup = (groupId) => {
  return async (dispatch) => {
    dispatch({
      type: "LEAVING_SELECTED_GROUP"
    })

    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    try {
      let res = await fetch(API_ROOT + `/groups/${groupId}/leave-group`, configObj)
      if ((res.status == 204)) {
        dispatch({ 
          type: 'LEAVE_SELECTED_GROUP',
          groupId: groupId
        })
      } else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }    
    } catch (error) {
      alert(error)
    }
  }  
}


export const clearSelectedGroup = () => {
  return {
    type: "CLEAR_SELECTED_GROUP",
  }  
}




