export const loadGroups = (groups) => {
	console.log("loading groups")
	return {
		type: "LOAD_GROUPS",
		groups
	}
}

export const setSelectedGroup = group => {
	console.log("dispatching set details to true")
	return {
		type: "SET_SELECTED_GROUP",
		group
	}
} 