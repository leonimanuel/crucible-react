import chunk from 'lodash/chunk';
import cloneDeep from "lodash/cloneDeep"
import _ from 'lodash';

export default function topicsReducer(state = {
	topics: [],
	facts: [],
	parentTopic: "",
	b: ""
}, action) {
	switch (action.type) {
		case "LOAD_FACTS":
			// debugger
			return {
				...state,
				facts: action.facts
			}

		case "ADD_TOPICS":
			// debugger
			console.log("adding topics")
			return {
				...state,
				topics: action.topics
			}

		case "SELECT_TOPIC":
			console.log("setting parent topic")
			return {
				...state,
				parentTopic: action.topic		
			}

		case "MOVE_FACT":
			debugger
			return {
				...state,
				facts: [...state.facts.filter(f => f.id !== action.fact.id), action.fact]
			}		

		case "ADD_REPHRASE":
			debugger
			return {
				...state,
				facts: [...state.facts.filter(f => f.id !== action.fact.id), action.fact]
			}

		case "ADD_FACT":
			debugger
			return {
				...state,
				facts: [...state.facts, action.fact]
			}

		default:
			return state;
	}
}