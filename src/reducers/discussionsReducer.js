import _ from 'lodash';
import cloneDeep from "lodash/cloneDeep"

export default function discussionsReducer(state = {
	discussions: [],
	comments: [],
	addedNewComment: false,
	// discussion: "",
	discussionId: "",
	loading: false,
	renderForum: false

}, action) {
		// debugger
		// console.log("executing discussionsReducer")
		switch (action.type) {
			case "ADD_DISCUSSIONS":
			// debugger
				return {
					...state,
					discussions: action.discussions
				}

			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "POSTING_DISCUSSION":
				// debugger
				return {
					...state,
					loadingComment: true
				}

			case "ADD_DISCUSSION":
				// debugger
				let discsClone = _.cloneDeep(state.discussions)
				// let resetDisc = discsClone.filter(discussion => discussion.id === parseInt(action.discussionData.id))[0];
				// resetDisc.unread_messages_count = 0
				let resetDisc = action.discussionData
				let updatedDiscs = discsClone.filter(discussion => discussion.id !== resetDisc.id)
				updatedDiscs.push(resetDisc)
				return {
					...state,
					discussions: updatedDiscs,
					loading: false,
					// discussion: action.discussionData,
					discussionId: action.discussionData.id,
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

			case "ADD_MESSAGES_TO_DISCUSSION":
				let dClone = _.cloneDeep(state.discussions.find(d => d.id === state.discussionId))
				// debugger
				dClone.messages = action.messages
				let filteredClone = _.cloneDeep(state.discussions.filter(d => d.id !== dClone.id))
				filteredClone.push(dClone)
				debugger

				return {
					...state,
					discussions: filteredClone
				}

			case "ADD_MESSAGE_TO_DISCUSSION":
				console.log("adding message to discussion, updating state")
				// debugger
				let newDiscussionsClone = _.cloneDeep(state.discussions)
				let newDiscussionClone = _.cloneDeep(state.discussions.filter(d => d.id === action.message.discussion_id)[0])
				// debugger
				if (newDiscussionClone.messages) {
					newDiscussionClone.messages = [...newDiscussionClone.messages, action.message]
					let readyDiscussions = newDiscussionsClone.filter(discussion => discussion.id !== newDiscussionClone.id)
					readyDiscussions.push(newDiscussionClone)	
					// debugger
					return {
						...state,
						discussions: readyDiscussions
					}					
				} else {
					return state
				}


			case "RESET_DISCUSSION_UNREAD_COUNT":
				// debugger
				let discussionsClone = _.cloneDeep(state.discussions)
				let resetDiscussion = discussionsClone.filter(discussion => discussion.id === parseInt(action.response.discussion_id))[0];

				if (action.response.unread_messages === 0 ) {
					resetDiscussion.unread_messages_count = 0
				} else if (action.response.unread_messages === 1 && !state.renderForum ) {
						resetDiscussion.unread_messages_count += 1
				}

				let updatedDiscussions = discussionsClone.filter(discussion => discussion.id !== resetDiscussion.id)
				updatedDiscussions.push(resetDiscussion)

				return {
					...state,
					discussions: updatedDiscussions,
					// discussion: resetDiscussion
				}

			case "TOGGLE_FORUM":
				return {
					...state,
					renderForum: !state.renderForum
				}

			default:
				return state;	
		}
}
