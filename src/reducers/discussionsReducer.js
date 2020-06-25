import _ from 'lodash';
import cloneDeep from "lodash/cloneDeep"

export default function discussionsReducer(state = {
	comments: [],
	addedNewComment: false,
	discussion: "",
	loading: false,

}, action) {
		// debugger
		console.log("executing discussionsReducer")
		switch (action.type) {
			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "POSTING_DISCUSSION":
				debugger
				return {
					...state,
					loadingComment: true
				}

			case "ADD_DISCUSSION":
				// debugger
				return {
					...state,
					loading: false,
					discussion: action.discussionData,
					comments: action.discussionData.comments
				}

			case "ADD_COMMENT":
				// debugger
				return {
					...state,
					comments: [...state.comments, action.comment],
					addedNewComment: true
				}

			case "FALSIFY_ADDED_NEW_COMMENT":
				// debugger
				return {
					...state,
					addedNewComment: false
				}

			case "ADD_MESSAGE_TO_DISCUSSION":
				let discussionClone = _.cloneDeep(state.discussion)
				discussionClone.messages = [...discussionClone.messages, action.message]
				return {
					...state,
					discussion: discussionClone
				}

			default:
				return state;	
		}
}
