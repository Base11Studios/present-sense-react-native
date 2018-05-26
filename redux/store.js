import { applyMiddleware, createStore } from "redux";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers"; // the value from combineReducers
import { migrations } from "./reducers/tasks";
import mySaga from "./saga";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  // blacklist: ['navigation'],
  // whitelist: ['auth', 'notes']
  migrate: createMigrate(migrations, { debug: false })
};

const sagaMiddleware = createSagaMiddleware();
const myPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  myPersistReducer,
  applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);

sagaMiddleware.run(mySaga);
