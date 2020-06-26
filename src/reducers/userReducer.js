import chunk from 'lodash/chunk';
import _ from 'lodash';
import { combineReducers } from "redux"
import groupsReducer from "./groupsReducer.js"


export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none",
	userId: "",
	topics: [],
	facts: [],
	// parentTopic: "",
}, action) {
	console.log("executing userReducer")
	switch (action.type) {
		case "LOG_IN":
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email,
				topics: action.user.topics,
				facts: action.user.facts,
				userId: action.user.id
			}
		
		case "LOG_OUT":
			return {
				isLoggedIn: false,
				userEmail: "none"
			}


		// case "ADD_FACT":
		// 	let boi = state.topics
		// 	let newTopicIndex = updatedTopics.findIndex(topic => topic.name === "New")

		// 	return {
		// 		...state,
		// 		topics: [...topics]
		// 	}
			
		default:
			return state;
	}
};





