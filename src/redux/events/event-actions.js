export const eventActionTypes = {
  ADD_EVENT_START: "ADD_EVENT_START",
  ADD_EVENT_SUCCESS: "ADD_EVENT_SUCCESS",
  ADD_EVENT_FAILURE: "ADD_EVENT_FAILURE",

  FETCH_EVENTS_ONMOUNT: "FETCH_EVENTS_ONMOUNT",
  FETCH_EVENTS_SUCCESS: "FETCH_EVENT_SUCCESS",
  FETCH_EVENTS_FAILURE: "FETCH_EVENT_FAILURE",

  UPDATE_EVENTS_START: "UPDATE_EVENTS_START",
  UPDATE_EVENTS_SUCCESS: "UPDATE_EVENT_SUCCESS",
  UPDATE_EVENTS_FAILURE: "UPDATE_EVENT_FAILURE",
};
export const eventUpdateStart = (obj) => ({
  type: eventActionTypes.UPDATE_EVENTS_START,
  payload: obj,
});
export const eventUpdateSuccess = (obj) => ({
  type: eventActionTypes.UPDATE_EVENTS_SUCCESS,
  payload: obj,
});
export const eventUpdateFailure = (err) => ({
  type: eventActionTypes.UPDATE_EVENTS_FAILURE,
  payload: err,
});

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
