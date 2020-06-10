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

// export const addFacts = facts => {
// 	return {
// 		type: "ADD_FACTS"	,
// 		facts	
// 	}
// }