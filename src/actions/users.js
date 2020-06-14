// import rootURL from "../rootURL.js"

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
	return {
		type: "SELECT_TOPIC",
		topic
	}
}

export const updateTopic = (fact, destinationTopic) => {
	console.log(fact)
	return {
		type: "UPDATE_TOPIC",
		fact,
		destinationTopic
	}
}



export const loadGroups = (groups) => {
	return {
		type: "LOAD_GROUPS",
		groups
	}
}

// export const showGroupDetails = group => {
// 	console.log("dispatching showGroupDetails")
// 	return {
// 		type: "SHOW_GROUP_DETAILS",
// 		group
// 	}
// }

export const setDetailsToTrue = () => {
	console.log("dispatching set details to true")
	return {
		type: "SET_DETAILS_TO_TRUE"
	}
} 





