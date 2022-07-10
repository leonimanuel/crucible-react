// import chunk from 'lodash/chunk';
// import _ from 'lodash';
// import { combineReducers } from "redux"
// import groupsReducer from "./groupsReducer.js"


export default function userReducer(state = {
	isLoggedIn: false,
	loginFailed: false,
	isConfirmed: false,
	userName: "",
	userEmail: "",
	userId: "",
	user: "",
	// userReputabilityScore: "",
	// userAccuracyScore: "",
	// totalUpvotes: "",
	// totalDownvotes: "",
	// userReviewScore: "",
	// reachScore: "",
	// dailyReviews: "",
	// dailyStreak: "",
	// dailyFactsComments: ""
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "LOG_IN":
			return {
				...state,
				isLoggedIn: true, //necessary?
				isConfirmed: action.user.email_confirmed,
				loginFailed: false,
				userName: action.user.handle,
				userEmail: action.user.email,
				userId: action.user.id,
				// userReputabilityScore: action.user.reputability_score,
				// userAccuracyScore: action.user.total_votes.accuracy,
				// userReviewScore: action.user.review_score,
				// reachScore: action.user.reach_score,
				// totalUpvotes: action.user.total_votes.tallies.total_upvotes,
				// totalDownvotes: action.user.total_votes.tallies.total_downvotes,
				// dailyReviews: action.user.daily_reviews,
				// dailyStreak: action.user.daily_streaks,
				// dailyFactsComments: action.user.daily_facts_comments,
				user: action.user,
				settings: action.user.settings
			}
		
		case "UPDATE_USER":
			let user = state.user
			user["name"] = action.user.name
			user["email"] = action.user.email
			user["handle"] = action.user.handle

			user["settings"]["email_tags"] = action.user.email_tags
			user["settings"]["email_replies"] = action.user.email_replies
			user["settings"]["email_group_add"] = action.user.email_group_add

			return {
				...state,
				userName: action.user.name,
				userEmail: action.user.email,
				user: user
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

		case "RESET_QUOTAS":
			return {
				...state,
				dailyReviews: 0,
				dailyFactsComments: 0				
			}

		case "UPDATE_ACCURACY_SCORE":
			return {
				...state,
				userAccuracyScore: action.response.total_votes.accuracy,
				totalUpvotes: action.response.total_votes.tallies.total_upvotes,
				totalDownvotes: action.response.total_votes.tallies.total_downvotes
			}

		case "ADD_COMMENT_TO_DISCUSSION":
			if (action.comment.user.id === action.currrentUserId) {
				return {
					...state,
					dailyFactsComments: action.comment.user.daily_facts_comments
				}
			} else {
				return state;
			}

		case "LOGIN_FAILED":
			return {
				...state,
				loginFailed: true
			}

		default:
			return state;
	}
};





