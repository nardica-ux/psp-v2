export const setCommentsRedux = (arr) => ({
  type: "SET_COMMENTS_REDUX",
  payload: arr,
});
export const addNewCommentRedux = (el) => ({
  type: "ADD_COMMENT_REDUX",
  payload: el,
});
export const deleteCommentFromRedux = (obj) => ({
  type: "DELETE_COMMENT_REDUX",
  payload: obj,
});
export const voteCommentInRedux = (obj) => ({
  type: "VOTE_COMMENT_REDUX",
  payload: obj,
});
