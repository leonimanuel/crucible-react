import { API_ROOT } from "../constants"


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
				debugger
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
	    	debugger
				dispatch({
					type: "MOVE_FACT",
					fact
				})
	   })
	    .catch(err => err.message)
  }
}

export const addFactToNew = (selection, articleURL) => {

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
					"selection_url": articleURL			
			})
		}
		// debugger
		fetch(API_ROOT + "/facts", configObj)
			.then(resp => resp.json())
			.then(fact => {
				// debugger
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

