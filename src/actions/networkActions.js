import { API_ROOT } from "../constants"
import { connect } from 'getstream';

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

export const showSelectedContact = (contactId) => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_SELECTED_CONTACT"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/contacts/${contactId}`, configObj)
	  .then(resp => resp.json())
	  .then(data => {
	  	dispatch({
	  		type: "SET_SELECTED_CONTACT",
	  		contact: data.contact,
	  		activities: data.feed_items  
	  	})

	  	dispatch({
	  		type: "SET_TIMELINE_TYPE",
	  		timelineType: "member"
	  	})
	  })
	  .catch(err => alert(err))
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


export const changeMemberFollow = (memberId, newFollowBool) => {
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
	      willFollow: newFollowBool,
	      memberId: memberId
	    })	    
	  }

	  fetch(API_ROOT + `/feed/followship`, configObj)
	    .then(resp => resp.json())
	    .then((data) => {
				dispatch({
					type: "CHANGE_MEMBER_FOLLOW_STATUS",
					followStatus: data.is_following
				})
				// const user_notification_feed = client.feed('notification', `${userId}`);		

			})  
	}
}













