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
			// debugger
			return {
				...state,
				isLoggedIn: true, //necessary?
				userName: action.user.name,
				userEmail: action.user.email,
				userId: action.user.id
			}
		
		case "LOG_OUT":
			return {
				isLoggedIn: false,
				userEmail: "none"
			}
			
		default:
			return state;
	}
};





