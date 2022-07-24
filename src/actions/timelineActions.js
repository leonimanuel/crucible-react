import mixpanel from 'mixpanel-browser';
import { API_ROOT } from "../constants"

export const setActivities = (activityId, timelineType, handleLoad) => {
	return (dispatch) => {
		dispatch({
			type: "LOADING_ACTIVITIES"
		})
	
		let configObj = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			}
		}
		
		const path = timelineType === "myFeed" ? "timeline" : "discover"
		fetch(API_ROOT + `/${path}/${activityId}`, configObj)
			.then(resp => resp.json())
			.then(activities => {
				const replies = activities.map(a => a.item.object.replies ? a.item.object.replies : null).flat().filter(r => !!r)
				dispatch({
					type: "SET_ACTIVITIES",
					timelineType: timelineType,
					activities

				})
				dispatch({
					type: "SET_REPLIES",
					replies
				})

				handleLoad()
			})
			.catch(err => alert(err))	
	}		
}

export const clearNewPostContaner = () => {
	return {
		type: "CLEAR_NEW_POSITION_CONTAINER"
	}
}

export const createReply = (text, comment_id, factIDs, responseExcerptId, taggedUserIds, closeReplyForm) => {
	return async (dispatch) => {
		dispatch({
			type: "CREATING_REPLY"
		})
	
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        text: text,
        factIds: factIDs,
        responseExcerptId: responseExcerptId,
        taggedUserIds: taggedUserIds
      })
    }
    
    try {
    	let res = await fetch(`${API_ROOT}/comments/${comment_id}/replies`, configObj)
    	if (res.status == 201) {
    		let reply = await res.json()

		  	mixpanel.track("Create Reply", {
		  		has_comment: !!text,
		  		has_selection: !!responseExcerptId,
		  		supported: !!factIDs.length,
		  		parent_id: comment_id,
		  		reply_id: reply.id
		  	})    		

				dispatch({
					type: "ADD_NEW_REPLY",
					reply
				})

				closeReplyForm()
    	} 
    	else if (res.status == 422) {
        let response = await res.json()
        alert(response.errors.join('\r\n'))    		
    	}
    }
    catch (error) {
    	alert(error)
    }
	}		
}













