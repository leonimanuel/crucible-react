export const selectComment = (comment, currentUserId) => {
  return {
    type: "SELECT_COMMENT",
    comment,
    currentUserId
  }
}