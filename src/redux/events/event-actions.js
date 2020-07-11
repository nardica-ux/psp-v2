export const eventActionTypes = {
  ADD_EVENT_START: "ADD_EVENT_START",
  ADD_EVENT_SUCCESS: "ADD_EVENT_SUCCESS",
  ADD_EVENT_FAILURE: "ADD_EVENT_FAILURE",
};

export const addEventStart = (obj) => ({
  type: eventActionTypes.ADD_EVENT_START,
  payload: obj,
});
export const addEventSuccess = (obj) => ({
  type: eventActionTypes.ADD_EVENT_SUCCESS,
  payload: obj,
});
export const addEventFailure = ({ err }) => ({
  type: eventActionTypes.ADD_EVENT_FAILURE,
  payload: err,
});
