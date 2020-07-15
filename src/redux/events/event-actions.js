export const eventActionTypes = {
  ADD_EVENT_START: "ADD_EVENT_START",
  ADD_EVENT_SUCCESS: "ADD_EVENT_SUCCESS",
  ADD_EVENT_FAILURE: "ADD_EVENT_FAILURE",

  FETCH_EVENTS_ONMOUNT: "FETCH_EVENTS_ONMOUNT",
  FETCH_EVENTS_SUCCESS: "FETCH_EVENT_SUCCESS",
  FETCH_EVENTS_FAILURE: "FETCH_EVENT_FAILURE",
};
export const fetchEventsOnMount = (obj) => ({
  type: eventActionTypes.FETCH_EVENTS_ONMOUNT,
  payload: obj,
});
export const fetchEventsSuccess = (obj) => ({
  type: eventActionTypes.FETCH_EVENTS_SUCCESS,
  payload: obj,
});
export const fetchEventsFailure = (err) => ({
  type: eventActionTypes.FETCH_EVENTS_FAILURE,
  payload: err,
});

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
