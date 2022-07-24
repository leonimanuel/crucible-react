import { API_ROOT } from "../constants"


export const addNewTopic = (parentId, topicName, closePopup) => {
	return async (dispatch) => {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
			body: JSON.stringify({
				parentId: parentId,
				topicName: topicName
			})
    }
    // debugger
    
    try {
    	let res = await fetch(API_ROOT + `/topics`, configObj);
    	if (res.status == 201) {
    		let topic = await res.json();
        dispatch({ 
					type: 'ADD_NEW_TOPIC', 
					topic
				});
				closePopup()
    	}
    	else if (res.status == 422) {
        let response = await res.json();
        alert(response.errors.join('\r\n'));
    	}
      else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
      }
    } 
    catch (error) {
    	alert(error)
    }
	}
}

export const fetchTopics = () => {
	return (dispatch) => {
		dispatch({type: "GETTING_TOPICS"})
	  let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/topics`, configObj)
	    .then(resp => resp.json())
	    .then((topics) => {
				dispatch(({
					type: "ADD_TOPICS",
					topics
				}))
				// this.props.addTopics(data)
	    })
	    .catch(err => err.message)
	}
}

export const selectTopic = topic => {
	return {
		type: "SELECT_TOPIC",
		topic
	}
}

export const moveFact = (factId, originTopicName, destinationTopicName) => {
  return (dispatch) => {
	  let configObj = {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }, 
	    body: JSON.stringify({
	    	fact_id: factId,
	    	origin_topic_name: originTopicName,
	    	destination_topic_name: destinationTopicName
	    })
	  }

	  fetch(API_ROOT + `/facts`, configObj)
	    .then(resp => resp.json())
	    .then((fact) => {
				dispatch({
					type: "MOVE_FACT",
					fact
				})
	   })
	    .catch(err => err.message)
  }
}

export const addFactToNew = (selection, articleURL, rephrase) => {
	return (dispatch) => {
		dispatch({type: "POST_FACT"})
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			},
			body: JSON.stringify({
					"selected_text": selection,
					"selection_url": articleURL,
					"rephrase": rephrase	
			})
		}
		fetch(API_ROOT + "/facts", configObj)
			.then(resp => resp.json())
			.then(fact => {
				dispatch({
					type: "ADD_FACT",
					fact
				})
			})
			.catch(function(error) {
				alert(error.message);
			})			
	}
}










