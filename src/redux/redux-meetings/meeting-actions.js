export const fetchAllMeetings = (arr) => ({
  type: "FETCH_ALL_MEETINGS",
  payload: arr,
});
export const clearMeetingsRedux = () => ({
  type: "DELETE_MEETINGS_REDUX",
});
