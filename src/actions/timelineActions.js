import { API_ROOT } from "../constants"

export const setActivities = (activityId, handleLoad) => {
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

		fetch(API_ROOT + `/timeline/${activityId}`, configObj)
			.then(resp => resp.json())
			.then(activities => {
				const replies = activities.map(a => a.item.object.replies ? a.item.object.replies : null).flat().filter(r => !!r)
				dispatch({
					type: "SET_ACTIVITIES",
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

export const createReply = (text, comment_id, factIDs, reponseExcerptId, taggedUserIds, clearReplyForm) => {
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
        responseExcerptId: reponseExcerptId,
        taggedUserIds: taggedUserIds
      })
    }
    
    try {
    	let res = await fetch(`${API_ROOT}/comments/${comment_id}/replies`, configObj)
    	if (res.status == 200) {
    		let reply = await res.json()
				dispatch({
					type: "ADD_NEW_REPLY",
					reply
				})

				clearReplyForm()
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













