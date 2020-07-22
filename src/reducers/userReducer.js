import chunk from 'lodash/chunk';
import _ from 'lodash';
import { combineReducers } from "redux"
import groupsReducer from "./groupsReducer.js"


export default function userReducer(state = {
	isLoggedIn: false,
	userName: "",
	userEmail: "",
	userId: "",
	user: ""
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "LOG_IN":
			debugger
			return {
				...state,
				isLoggedIn: true, //necessary?
				userName: action.user.name,
				userEmail: action.user.email,
				userId: action.user.id,
				user: action.user
			}
		
		case "LOG_OUT":
			return {
				...state,
				isLoggedIn: false,
				userName: "",
				userEmail: "",
				userId: "",
				user: ""
			}
			
		default:
			return state;
	}
};





