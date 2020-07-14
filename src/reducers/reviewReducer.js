import chunk from 'lodash/chunk';
import _ from 'lodash';

export default function userReducer(state = {
	allReviewFacts: []
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "ADD_REVIEW_FACTS":
		debugger
			return {
				allReviewFacts: action.facts
			}

		default:
			return state;
	}
};





