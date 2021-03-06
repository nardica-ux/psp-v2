export const meetingsActionTypes = {
  FETCH_MEETINGS_START: "FETCH_MEETINGS_START",
  DELETE_MEETINGS_REDUX: "DELETE_MEETINGS_REDUX",
  SET_MEETINGS_CARDS: "SET_MEETINGS_CARDS",
  FETCH_MEETINGS_SUCCESS: "FETCH_MEETINGS_SUCCESS",
  FETCH_MEETINGS_FAILURE: "FETCH_MEETINGS_FAILURE",

  UPDATE_MEETING_START: "UPDATE_MEETING_START",
  UPDATE_MEETING_SUCCESS: "UPDATE_MEETING_SUCCESS",
  UPDATE_MEETING_FAILURE: "UPDATE_MEETING_FAILURE",

  POINT_EVENT_TOREDUX: "POINT_EVENT_TOREDUX",
  CREATE_NEW_MEETING: "CREATE_NEW_MEETING",
  CREATE_NEW_MEETING_SUCCESS: "CREATE_NEW_MEETING_SUCCESS",
  CREATE_NEW_MEETING_FAILURE: "CREATE_NEW_MEETING_FAILURE",
};

export const createNewMeetingStart = (obj) => ({
  type: meetingsActionTypes.CREATE_NEW_MEETING,
  payload: obj,
});
export const createNewMeetingSuccess = (obj) => ({
  type: meetingsActionTypes.CREATE_NEW_MEETING_SUCCESS,
  payload: obj,
});
export const createNewMeetingFailure = (err) => ({
  type: meetingsActionTypes.CREATE_NEW_MEETING_FAILURE,
  payload: err,
});

export const pointEventToRedux = (obj) => ({
  type: meetingsActionTypes.POINT_EVENT_TOREDUX,
  payload: obj,
});

export const update_meeting_start = (obj) => ({
  type: meetingsActionTypes.UPDATE_MEETING_START,
  payload: obj,
});
export const update_meeting_success = (obj) => ({
  type: meetingsActionTypes.UPDATE_MEETING_SUCCESS,
  payload: obj,
});
export const update_meeting_failure = (err) => ({
  type: meetingsActionTypes.UPDATE_MEETING_FAILURE,
  payload: err,
});

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
