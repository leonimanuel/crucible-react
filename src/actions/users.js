import rootURL from "../rootURL.js"

export const logIn = (user) => {
	// console.log(user)
	return {
		type: "LOG_IN",
		user
	}
}

export const logOut = () => {
	return {
		type: "LOG_OUT"		
	}
}

export const addTopics = (topics) => {
	return {
		type: "ADD_TOPICS",
		topics
	}
}

export const selectTopic = topic => {
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    }
  }

  // console.log(store)
  fetch(rootURL() + `/topics/${topic.id}`, configObj)
    .then(resp => resp.json())
    .then((data) => {
      if (data.facts) {
        // console.log(data)
        topic.facts = data.facts
      } else {
        console.log("error")
      }
    })
	return {
		type: "SELECT_TOPIC",
		topic
	}
}
