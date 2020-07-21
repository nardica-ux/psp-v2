import meetingReducer from "./redux-meetings/meeting-reducer";
import commentsReducer from "./comments/comments-reducer";
import evaluationReducer from "./evaluations/evaluation-reducer";
import userReducer from "./users/users-reducer";
import eventReducer from "./events/event-reducer";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["meetings", "evaluations", "comments", "users", "events"],
};

const rootReducer = combineReducers({
  meetings: meetingReducer,
  comments: commentsReducer,
  evaluations: evaluationReducer,
  users: userReducer,
  events: eventReducer,
});
export default persistReducer(persistConfig, rootReducer);
