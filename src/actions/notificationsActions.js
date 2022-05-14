import { API_ROOT, STREAM_CLIENT_ID, STREAM_APP_ID } from "../constants"
import { connect } from 'getstream';


let client = ""

export const setNotifications = (userId) => {
	return (dispatch) => {
		dispatch({
			type: "LOADING_NOTIFICATIONS"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/notifications`, configObj)
	    .then(resp => resp.json())
	    .then(async (data) => {
				client = connect(STREAM_CLIENT_ID, data.token, STREAM_APP_ID); // client is declared at top of file

				const user_notification_feed = client.feed('notification', `${userId}`);

				const subscription = user_notification_feed.subscribe(function (data) {
					console.log("new notification! please reload to see for now")
					// debugger
				})				

				dispatch({
					type: "SET_NOTIFICATIONS",
					notifications: data.notifications
				})
			})   	
	}		
}

export const readNotification = (objectId, objectType, notificationGroupId, userId) => {
	return async (dispatch) => {
		dispatch({
			type: "LOADING_NOTIFICATION_TARGET"
		})
	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  if (objectType == "Comment" || objectType == "Position") {
		  fetch(API_ROOT + `/comments/${objectId}`, configObj)
		    .then(resp => {
		    	return resp.json()
		    	// debugger
		    })
		    .then(activity => {
				  let notifId = notificationGroupId
				  // debugger
					dispatch({
						type: "SET_NOTIFICATION_ACTIVITY",
						activity
					})

					dispatch({
						type: "READ_NOTIFICATION",
						notifId
					})

					dispatch({
						type: "SET_TIMELINE_TYPE",
						timelineType: "notification"
					})

					const read_res = client.﻿feed﻿(﻿'notification'﻿, `${userId}`﻿)﻿.﻿get﻿({ mark_read: ﻿[﻿﻿notifId]﻿ }) 					


		    })
		    .catch(err => alert(err))

	  } 
	  else if (objectType == "Reply") {
  		try {
  			let res = await fetch(API_ROOT + `/replies/${objectId}`, configObj)
  			if (res.status == 200) {
					let activity = await res.json()
					let notifId = notificationGroupId
					dispatch({
						type: "SET_NOTIFICATION_ACTIVITY",
						activity
					})
					const replies = activity.item.object.replies ? activity.item.object.replies : null.flat().filter(r => !!r)
					dispatch({
						type: "SET_REPLIES",
						replies
					})


					dispatch({
						type: "READ_NOTIFICATION",
						notifId
					})

					dispatch({
						type: "SET_TIMELINE_TYPE",
						timelineType: "notification"
					})

					const read_res = client.﻿feed﻿(﻿'notification'﻿, `${userId}`﻿)﻿.﻿get﻿({ mark_read: ﻿[﻿﻿notifId]﻿ })  				
  			}
  		} catch (error) {
  			alert (error, "readNotification")
  		}
	  } 
	  else {
			alert("no handling for this resource type yet")
	  }
				
	}			
}

export const showPost = (postObjType, postObjId) => {
	return (dispatch) => {
		dispatch({
			type: "LOADING_NOTIFICATION_TARGET"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  if (postObjType == "Comment" || postObjType == "Position") {
		  fetch(API_ROOT + `/comments/${postObjId}`, configObj)
		    .then(resp => {
		    	return resp.json()
		    	// debugger
		    })
		    .then(activity => {
				  debugger
					dispatch({
						type: "SET_NOTIFICATION_ACTIVITY",
						activity
					})

					const replies = activity.item.object.replies.flat().filter(r => !!r)
			  	dispatch(({
			  		type: "SET_REPLIES",
			  		replies: replies
			  	}))					

					dispatch({
						type: "SET_TIMELINE_TYPE",
						timelineType: "notification"
					})
		    })
		    .catch(err => alert(err))

	  }
	  else if (postObjType == "Reply") {
		  fetch(API_ROOT + `/replies/${postObjId}`, configObj)
		    .then(resp => {
		    	return resp.json()
		    	// debugger
		    })
		    .then(activity => {
				  // debugger
					dispatch({
						type: "SET_NOTIFICATION_ACTIVITY",
						activity
					})

					dispatch({
						type: "SET_TIMELINE_TYPE",
						timelineType: "notification"
					})
		    })
		    .catch(err => alert(err))	  	
	  } 
	  else {
	  	alert("no handling for this resource type yet")
	  }				
	}
}

export const clearNotificationActivity = () => {
	return (dispatch) => {
		dispatch({
			type: "CLEAR_NOTIFICATION_ACTIVITY"
		})

		dispatch({
			type: "SET_TIMELINE_TYPE",
			timelineType: "feed"
		})	
	}			
}

	// const notificationFeed = client.feed('notification', `${userId}`); 
	 
	// const callback = data => { 
	// 	console.log(data); 
	// }; 
	 
	// const successCallback = () => { 
	// 	alert('now listening to changes in realtime'); 
	// }; 
	 
	// const failCallback = data => { 
	// 	alert('something went wrong, check the console logs'); 
	// 	alert(data); 
	// }; 
	 
	// notificationFeed.subscribe(callback).then(successCallback, failCallback);	      
//    const client = StreamChat.﻿getInstance﻿(﻿﻿"37zxvpg2wqvj")﻿
	// await client.﻿connectUser﻿({ id: userIdString}﻿, data.token)
	// const state = await channel.watch(); 




