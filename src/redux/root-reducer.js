import meetingReducer from "./redux-meetings/meeting-reducer";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: "meetings",
};
const rootReducer = combineReducers({
  meetings: meetingReducer,
});
export default persistReducer(persistConfig, rootReducer);
