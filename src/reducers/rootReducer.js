import { combineReducers } from "redux"
import groupsReducer from "./groupsReducer.js"
import userReducer from "./userReducer.js"


export default combineReducers({
	users: userReducer,
	groups: groupsReducer
})