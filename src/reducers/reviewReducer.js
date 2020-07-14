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

		case "RESET_FACT_UNDER_REVIEW":
			debugger
			return {
				factUnderReview: state.allReviewFacts.shift(),
				allReviewFacts: state.allReviewFacts				
			}

		default:
			return state;
	}
};





