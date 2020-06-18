export const logIn = (user) => {
	// debugger
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

// export const addTopics = (topics) => {
// 	return {
// 		type: "ADD_TOPICS",
// 		topics
// 	}
// }




// export const showGroupDetails = group => {
// 	console.log("dispatching showGroupDetails")
// 	return {
// 		type: "SHOW_GROUP_DETAILS",
// 		group
// 	}
// }





