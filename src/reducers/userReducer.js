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
	userAccuracyScore: "",
	totalUpvotes: "",
	totalDownvotes: "",
	userReviewScore: "",
	dailyReviews: "",
	dailyStreak: ""
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "LOG_IN":
			return {
				...state,
				isLoggedIn: true, //necessary?
				userName: action.user.name,
				userEmail: action.user.email,
				userId: action.user.id,
				userReputabilityScore: action.user.reputability_score,
				userAccuracyScore: action.user.total_votes.accuracy,
				userReviewScore: action.user.review_score,
				totalUpvotes: action.user.total_votes.tallies.total_upvotes,
				totalDownvotes: action.user.total_votes.tallies.total_downvotes,
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
				dailyReviews: action.response.daily_reviews
			}

		case "UPDATE_ACCURACY_SCORE":
			debugger
			return {
				...state,
				userAccuracyScore: action.response.total_votes.accuracy,
				totalUpvotes: action.response.total_votes.tallies.total_upvotes,
				totalDownvotes: action.response.total_votes.tallies.total_downvotes
			}

		default:
			return state;
	}
};





