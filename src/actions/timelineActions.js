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

export const createReply = (text, comment_id, factIDs, taggedUserIds, clearReplyForm) => {
	return (dispatch) => {
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
        taggedUserIds: taggedUserIds
      })
    }
    fetch(`${API_ROOT}/comments/${comment_id}/replies`, configObj)
      .then(resp => resp.json())
      .then((reply) => {
				dispatch({
					type: "ADD_NEW_REPLY",
					reply
				})

				clearReplyForm()
      })
      .catch(err => alert(err))
	}		
}