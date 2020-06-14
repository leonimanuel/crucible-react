export const loadGroups = (groups) => {
	console.log("loading groups")
	return {
		type: "LOAD_GROUPS",
		groups
	}
}