export const meetingsActionTypes = {
  FETCH_MEETINGS_START: "FETCH_MEETINGS_START",
  DELETE_MEETINGS_REDUX: "DELETE_MEETINGS_REDUX",
  SET_MEETINGS_CARDS: "SET_MEETINGS_CARDS",
  FETCH_MEETINGS_SUCCESS: "FETCH_MEETINGS_SUCCESS",
  FETCH_MEETINGS_FAILURE: "FETCH_MEETINGS_FAILURE",
};

export const fetchMeetingsSuccess = (arr) => ({
  type: meetingsActionTypes.FETCH_MEETINGS_SUCCESS,
  payload: arr,
});

export const fetchMeetingsFailure = (err) => ({
  type: meetingsActionTypes.FETCH_MEETINGS_FAILURE,
  payload: err,
});
export const clearMeetingsRedux = () => ({
  type: meetingsActionTypes.DELETE_MEETINGS_REDUX,
});
export const setMeetingCards = ({ id, num }) => ({
  type: meetingsActionTypes.SET_MEETINGS_CARDS,
  payload: { id, num },
});

export const fetchMeetingsStart = () => ({
  type: meetingsActionTypes.FETCH_MEETINGS_START,
});
