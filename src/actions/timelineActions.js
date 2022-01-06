import { API_ROOT } from "../constants"

export const setActivities = () => {
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

		fetch(API_ROOT + "/timeline", configObj)
			.then(resp => resp.json())
			.then(activities => {
				const replies = activities.map(a => a.item.object.replies ? a.item.object.replies : null).flat()
				dispatch({
					type: "SET_ACTIVITIES",
					activities
				})
				dispatch({
					type: "SET_REPLIES",
					replies
				})
			})
			.catch(err => alert(err))	
	}		
}

export const createReply = (text, comment_id, factIDs, clearReplyForm) => {
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
        factIds: factIDs
      })
    }
    fetch(`${API_ROOT}/comments/${comment_id}/replies`, configObj)
      .then(resp => resp.json())
      .then((reply) => {
				debugger
				dispatch({
					type: "ADD_NEW_REPLY",
					reply
				})

				clearReplyForm()
      })
      .catch(err => alert(err))
	}		
}