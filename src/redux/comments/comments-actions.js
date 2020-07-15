export const commentsActionTypes = {
  FETCH_COMMENTS_START: "FETCH_COMMENTS_START",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  FETCH_COMMENTS_FAILURE: "FETCH_COMMENTS_FAILURE",

  ADD_COMMENT_REDUX: "ADD_COMMENT_REDUX",
  ADD_COMMENT_REDUX_SUCCESS: "ADD_COMMENT_REDUX_SUCCESS",
  ADD_COMMENT_REDUX_FAILURE: "ADD_COMMENT_REDUX_FAILURE",

  DELETE_COMMENT_START: "DELETE_COMMENT_START",
  DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
  DELETE_COMMENT_FAILURE: "DELETE_COMMENT_FAILURE",
  VOTE_COMMENT_REDUX: "VOTE_COMMENT_REDUX",

  VOTE_COMMENT_START: "VOTE_COMMENT_START",
  VOTE_COMMENT_SUCCESS: "VOTE_COMMENT_SUCCESS",
  VOTE_COMMENT_FAILURE: "VOTE_COMMENT_FAILURE",
};

export const fetchCommentsSuccess = (arr) => ({
  type: commentsActionTypes.FETCH_COMMENTS_SUCCESS,
  payload: arr,
});
export const fetchCommentsFailure = (message) => ({
  type: commentsActionTypes.FETCH_COMMENTS_FAILURE,
  payload: message,
});

export const fetchCommentsStart = () => ({
  type: commentsActionTypes.FETCH_COMMENTS_START,
});

export const addNewCommentStart = (el) => ({
  type: commentsActionTypes.ADD_COMMENT_REDUX,
  payload: el,
});
export const addNewCommentSuccess = (el) => ({
  type: commentsActionTypes.ADD_COMMENT_REDUX_SUCCESS,
  payload: el,
});
export const addNewCommentFailure = (el) => ({
  type: commentsActionTypes.ADD_COMMENT_REDUX_FAILURE,
  payload: el,
});
export const deleteCommentStart = (obj) => ({
  type: commentsActionTypes.DELETE_COMMENT_START,
  payload: obj,
});
export const deleteCommentSuccess = (obj) => ({
  type: commentsActionTypes.DELETE_COMMENT_SUCCESS,
  payload: obj,
});
export const deleteCommentFailure = (err) => ({
  type: commentsActionTypes.DELETE_COMMENT_FAILURE,
  payload: err,
});
export const voteCommentStart = (obj) => ({
  type: commentsActionTypes.VOTE_COMMENT_START,
  payload: obj,
});
export const voteCommentSuccess = (obj) => ({
  type: commentsActionTypes.VOTE_COMMENT_SUCCESS,
  payload: obj,
});
export const voteCommentFail = (err) => ({
  type: commentsActionTypes.VOTE_COMMENT_FAILURE,
  payload: err,
});
