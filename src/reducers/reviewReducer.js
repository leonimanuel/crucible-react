import chunk from 'lodash/chunk';
import _ from 'lodash';

export default function userReducer(state = {
	factUnderReview: "",
	allReviewFacts: []
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "ADD_REVIEW_FACTS":
			let facts = action.facts;
			let firstFact = action.facts.shift();
			let remainingFacts = action.facts
			// debugger
			return {
				factUnderReview: firstFact,
				allReviewFacts: remainingFacts
			}

		default:
			return state;
	}
};





