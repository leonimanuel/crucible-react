import _ from 'lodash';
import cloneDeep from "lodash/cloneDeep"

export default function discussionsReducer(state = {
	allDiscussions: [],
	selectedDiscussionId: "",
	allComments: [],
	addedNewComment: false,
	allMessages: [],
	loading: false,
	renderForum: false,
	commentsRendered: false,
	allInterests: [],
	selectedInterests: []
}, action) {
		// console.log("executing discussionsReducer")
		switch (action.type) {
			case "ADD_DISCUSSIONS":
				return {
					...state,
					allDiscussions: action.discussions
				}

			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "POSTING_DISCUSSION":
				return {
					...state,
					loadingComment: true
				}

			case "ADD_DISCUSSION_AND_COMMENTS":
				// let detailedDiscussion = action.discussionData
				// state.allDiscussions.findIndex(discussion => discussion.id === detailedDiscussion.id)
				return {
					...state,
					selectedDiscussionId: action.discussionData.id,
					allDiscussions: [...state.allDiscussions.filter(d => d.id !== action.discussionData.id), action.discussionData],
					allComments: state.allComments.filter(c => c.discussion_id !== action.discussionData.id).concat(action.discussionData.comments),
					commentsRendered: false
					// discussion
				}

			case "ADD_NEW_DISCUSSION":
				return {
					...state,
					allDiscussions: [...state.allDiscussions, action.discussion]
				}

				// let discsClone = _.cloneDeep(state.discussions)
				// // let resetDisc = discsClone.filter(discussion => discussion.id === parseInt(action.discussionData.id))[0];
				// // resetDisc.unread_messages_count = 0
				// let resetDisc = action.discussionData
				// let updatedDiscs = discsClone.filter(discussion => discussion.id !== resetDisc.id)
				// updatedDiscs.push(resetDisc)
				// return {
				// 	...state,
				// 	discussions: updatedDiscs,
				// 	loading: false,
				// 	// discussion: action.discussionData,
				// 	discussionId: action.discussionData.id,
				// 	comments: action.discussionData.comments
				// }

			// case "ADD_COMMENTS":
			// 	return {
			// 		...state,
			// 		allComments: 
			// 	}
			


			// case "ADD_COMMENT":
			// 	return {
			// 		...state,
			// 		allComments: [...state.allComments, action.comment],
			// 		addedNewComment: true
			// 	}

			case "ADD_COMMENT_TO_DISCUSSION":
				debugger
				return {
					...state,
					allComments: [...state.allComments, action.comment],
					addedNewComment: true
				}

			case "FALSIFY_ADDED_NEW_COMMENT":
				return {
					...state,
					addedNewComment: false
				}

			case "ADD_MESSAGES_TO_DISCUSSION":
				return {
					...state,
					allMessages: state.allMessages.concat(action.messages)
				}
				// let dClone = _.cloneDeep(state.discussions.find(d => d.id === state.discussionId))
				// dClone.messages = action.messages
				// let filteredClone = _.cloneDeep(state.discussions.filter(d => d.id !== dClone.id))
				// filteredClone.push(dClone)

				// return {
				// 	...state,
				// 	discussions: filteredClone
				// }



			case "ADD_MESSAGE_TO_DISCUSSION":
				console.log("adding message to discussion, updating state")
				return {
					...state,
					allMessages: [...state.allMessages, action.message]
				}				


				// let newDiscussionsClone = _.cloneDeep(state.discussions)
				// let newDiscussionClone = _.cloneDeep(state.discussions.filter(d => d.id === action.message.discussion_id)[0])
				// if (newDiscussionClone.messages) {
				// 	newDiscussionClone.messages = [...newDiscussionClone.messages, action.message]
				// 	let readyDiscussions = newDiscussionsClone.filter(discussion => discussion.id !== newDiscussionClone.id)
				// 	readyDiscussions.push(newDiscussionClone)	
				// 	return {
				// 		...state,
				// 		discussions: readyDiscussions
				// 	}					
				// } else {
				// 	return state
				// }
			
			case "RESET_DISCUSSION_UNREAD_COUNT":
				let discussionsClone = _.cloneDeep(state.allDiscussions)
				let resetDiscussion = discussionsClone.find(discussion => discussion.id === parseInt(action.response.discussion_id));

				if (action.response.unread_messages === 0 ) {
					resetDiscussion.unread_messages_count = 0
				} else if (action.response.unread_messages === 1 && !(state.renderForum && state.selectedDiscussionId === action.response.discussion_id)) {
					resetDiscussion.unread_messages_count += 1
				}
				
				let updatedDiscussions = discussionsClone.filter(discussion => discussion.id !== resetDiscussion.id)
				updatedDiscussions.push(resetDiscussion)
				return {
					...state,
					allDiscussions: updatedDiscussions,
				}

			case "TOGGLE_FORUM":
				if (action.bool === false) {
					return { ...state, renderForum: false }
				} else {
					return { ...state, renderForum: !state.renderForum }
				}



			case "SET_COMMENTS_RENDERED_TO_TRUE":
				return {
					...state,
					commentsRendered: true
				}

			case "LOAD_INTERESTS":
				// debugger
				return {
					...state,
					allInterests: action.interests,
					selectedInterests: action.interests.filter(i => i.selected === true)
				}

			case "UPDATE_SELECTED_INTERESTS":
				return {
					...state,
					allInterests: action.interests
				}


			default:
				return state;	
		}
}
