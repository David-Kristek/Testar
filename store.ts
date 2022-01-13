// import { applyMiddleware, createStore, compose, AnyAction } from "redux";
// // import { offline } from '@redux-offline/redux-offline';
// // import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

// // thunk pro asynchroni funkce :
// //   by axios and thunk( create space for non-pure function(otherwise the dispatches cannot be put insides) inside an action creator)
// import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk";

// // https://stackoverflow.com/questions/64857870/how-to-dispatch-thunkaction-with-redux-thunk-and-typescript
// const store = createStore(
//   reducer,
//   applyMiddleware(thunkMiddleware as ThunkMiddleware<RootState, AnyAction, any>)
// );
// export default store;
// type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthReducer from "./redux/slicers/auth";
import TaskReducer from "./redux/slicers/task";
import { taskApi } from "./services/task";
import OfflineActionMiddleware, {
  OfflineActionsResolve,
} from "./redux/middlewares/OfflineActionMiddleware";

const AuthReducerN = (state: any, action: AnyAction) => {
  if (action.type === "auth/logout") {
    AsyncStorage.removeItem("persist:root");
  }
  return AuthReducer(state, action);
};

const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    auth: AuthReducerN,
    task: TaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([taskApi.middleware, OfflineActionMiddleware]),
});
export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
