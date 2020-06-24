import meetingReducer from "./redux-meetings/meeting-reducer";
import commentsReducer from "./comments/comments-reducer";
import evaluationReducer from "./evaluations/evaluation-reducer";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["meetings", "comments", "evaluations"],
};

const rootReducer = combineReducers({
  meetings: meetingReducer,
  comments: commentsReducer,
  evaluations: evaluationReducer,
});
export default persistReducer(persistConfig, rootReducer);
