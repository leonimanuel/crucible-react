// import chunk from 'lodash/chunk';
// import _ from 'lodash';
// import { combineReducers } from "redux"
// import groupsReducer from "./groupsReducer.js"


export default function userReducer(state = {
	isLoggedIn: false,
	userName: "",
	userEmail: "",
	userId: "",
	user: "",
	userReputabilityScore: "",
	userReviewScore: "",
	dailyReviews: "",
	dailyStreak: ""
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "LOG_IN":
			// debugger
			return {
				...state,
				isLoggedIn: true, //necessary?
				userName: action.user.name,
				userEmail: action.user.email,
				userId: action.user.id,
				userReputabilityScore: action.user.reputability_score,
				userReviewScore: action.user.review_score,
				dailyReviews: action.user.daily_reviews,
				dailyStreak: action.user.daily_streaks,
				user: action.user
			}
		
		case "LOG_OUT":
			return {
				...state,
				isLoggedIn: false,
				userName: "",
				userEmail: "",
				userId: "",
				userReviewScore: "",
				user: ""
			}
			
		case "RESET_ITEM_UNDER_REVIEW":
			return {
				...state,
				userReviewScore: state.userReviewScore + 10,
				dailyReviews: state.dailyReviews + 1
			}

		default:
			return state;
	}
};





