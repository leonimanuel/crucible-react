import { combineReducers } from "redux"
import groupsReducer from "./groupsReducer.js"
import userReducer from "./userReducer.js"
import discussionsReducer from "./discussionsReducer.js"
import topicsReducer from "./topicsReducer.js"


export default combineReducers({
	users: userReducer,
	sidenav: groupsReducer,
	discussion: discussionsReducer,
	topics: topicsReducer
})