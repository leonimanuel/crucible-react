import { API_ROOT } from "../constants"
import { connect } from 'getstream';
import mixpanel from 'mixpanel-browser';

let client = "" //for stream

export const fetchContacts = (contactType) => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_CONTACTS"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/contacts/index/${contactType}`, configObj)
	  .then(resp => resp.json())
	  .then(contacts => {
	  	dispatch({
	  		type: `SET_NETWORK_${contactType.toUpperCase()}`,
	  		contacts: contacts
	  	})
	  })
	  .catch(err => alert(err))
	}
}

export const showSelectedContact = (contactId, activityId, handleLoad, isLoggedIn) => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_SELECTED_CONTACT"
		})

		// debugger
	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  const path = isLoggedIn ? "profiles" : "profiles_unauthenticated"
	  fetch(API_ROOT + `/${path}/${contactId}?activityId=${activityId}`, configObj)
	  .then(resp => resp.json())
	  .then(data => {
	  	mixpanel.track("View Other Profile", {
	  		target_user_id: data.contact.id
	  	})

	  	dispatch({
	  		type: "SET_SELECTED_CONTACT",
	  		contact: data.contact,
	  		activities: data.feed_items  
	  	})

			const replies = data.feed_items.map(a => a.item.object.replies ? a.item.object.replies : null).flat().filter(r => !!r)
	  	dispatch(({
	  		type: "SET_REPLIES",
	  		replies: replies
	  	}))

	  	dispatch({
	  		type: "SET_TIMELINE_TYPE",
	  		timelineType: "member"
	  	})
	  })
	  .catch(err => {
	  	alert(err)
	  })

	  if (handleLoad) {handleLoad()} 
	}	
}

export const clearSelectedContact = () => {
	return (dispatch) => {
		dispatch({
			type: "CLEAR_SELECTED_CONTACT"
		})	

		dispatch({
			type: "SET_TIMELINE_TYPE",
			timelineType: "feed"
		})			
	}			
}

export const getMemberConnectionStatus = () => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_USER_TOKEN"
		})	

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/feed/token`, configObj)
	    .then(resp => resp.json())
	    .then((data) => {
				client = connect('37zxvpg2wqvj', data.token, '1155294'); // client is declared at top of file
				const userFollowStats = client.feed('user', `${data.user.id}`).followStats() 
				// const user_notification_feed = client.feed('notification', `${userId}`);		

			})  
	}
}


export const changeMemberFollow = (member, willFollow) => {
	return (dispatch) => {
		dispatch({
			type: "UPDATING_MEMBER_FOLLOW"
		})	

	 	let configObj = {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }, 
	    body: JSON.stringify({
	      willFollow: willFollow,
	      memberId: member.id
	    })	    
	  }

	  fetch(API_ROOT + `/feed/followship`, configObj)
	    .then(resp => resp.json())
	    .then((data) => {

        mixpanel.track((willFollow ? "Follow User" : "Unfollow User"), {
          target_user_id: member.id
        })				

				dispatch({
					type: "CHANGE_MEMBER_FOLLOW_STATUS",
					followStatus: data.is_following,
					member: member
				})
				// const user_notification_feed = client.feed('notification', `${userId}`);		

			})  
	}
}

export const fetchMemberRecommendations = (searchVal) => {
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
  		let response = await fetch(`${API_ROOT}/contacts/recommendations`, configObj)	
	  	if (response.status == 200) {
	  		let members = await response.json()
	  		dispatch({
	  			type: "SET_MEMBER_RECOMMENDATIONS",
	  			members: members
	  		})
	  	}
	  } catch (error) {
	  	console.log(error)
	  }  
  }
}

// export const fetchMemberSearches = (searchVal) => {
//   return async (dispatch) => {
//   	dispatch({type: "FETCHING_MEMBER_SEARCH_RESULTS"})

// 	  let configObj = {
// 	    method: 'GET',
// 	    headers: {
// 	      "Content-Type": "application/json",
// 	      Accept: "application/json",
// 	      Authorization: localStorage.getItem("token")
// 	    }
// 	  }
	  
// 	  try {
//   		let response = await fetch(`${API_ROOT}/contacts/search/${searchVal}`, configObj)
// 	  	if (response.status == 200) {
// 	  		let members = await response.json()
// 	  		dispatch({
// 	  			type: "SET_MEMBER_SEARCH_RESULTS",
// 	  			members: members
// 	  		})
// 	  	}
// 	  } catch (error) {
// 	  	console.log(error)
// 	  }  
//   }
// }

export const setSearchedMembersFollowStatuses = (searchedMembersFollowStatuses) => {
	debugger
	return {
		type: "SET_MEMBER_SEARCH_RESULTS_FOLLOWING_STATUS",
		searchedMembersFollowStatuses: searchedMembersFollowStatuses
	}
}

export const clearRecommendationsAndSearches = () => {
	debugger
	return {
		type: "CLEAR_RECOMMENDATIONS_AND_SEARCHES"
	}
}


