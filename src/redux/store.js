import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import persistReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, thunk, sagaMiddleware];
const store = createStore(persistReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
