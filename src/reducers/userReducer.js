import chunk from 'lodash/chunk';
import _ from 'lodash';


export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none",
	topics: [],
	facts: [],
	parentTopic: ""
}, action) {
	// console.log(action)
	switch (action.type) {
		case "LOG_IN":
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email,
				categories: action.user.topics,
				facts: action.user.facts
			}
		
		case "LOG_OUT":
			return {
				isLoggedIn: false,
				userEmail: "none"
			}

		case "ADD_TOPICS":
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

		case "UPDATE_TOPIC":
			console.log("updating parent topic")
			console.log(state.parentTopic.facts)
			console.log(action)
			
			let updatedTopics = state.topics
			let desTopicIndex = updatedTopics.findIndex(topic => topic.name === action.destinationTopic.root.name)
			let desRootTopic = updatedTopics[desTopicIndex]
			console.log(action.destinationTopic)

			// action.destinationTopic.facts.push(action.fact)
			// let updatedDesTopic = action.destinationTopic

			function getIndexPath(rootTopic, topic) {
				let schema = rootTopic
				let path = topic.path.map(topic => topic.name).slice(1)
				let indexPathArr = []
				for (let i = 0; i < path.length; i++) {
					let subIndex = schema.children.findIndex(topic => topic.name === path[i])
					schema = schema.children[subIndex]
					indexPathArr.push("children", subIndex)
				}

				indexPathArr.push("facts")
				return indexPathArr
			}

			let desIndexPathArr = getIndexPath(desRootTopic, action.destinationTopic)
			let desIndexPath = desIndexPathArr.join(".")
			_.get(desRootTopic, desIndexPath).push(action.fact)
			updatedTopics[desTopicIndex] = desRootTopic
			console.log(desRootTopic)
			// debugger


			let parTopicIndex = updatedTopics.findIndex(topic => topic.name === state.parentTopic.root.name)
			let parRootTopic = updatedTopics[parTopicIndex]
			
			let parIndexPathArr = getIndexPath(parRootTopic, state.parentTopic)
			let parIndexPath = parIndexPathArr.join(".")
			// _.get(parRootTopic, parIndexPath).filter(fact => fact.id !== action.fact.id)
			_.set(parRootTopic, parIndexPath, [])
			
			updatedTopics[parTopicIndex] = parRootTopic
			console.log(parRootTopic)
			
			return {
				...state,
				// parentTopic: {
				// 	...state.parentTopic, 
				// 	facts: state.parentTopic.facts.filter(fact => fact.id !== action.fact.id)
				// },
				topics: updatedTopics
			}
			
		default:
			return state;
	}
};

// export default userReducer;