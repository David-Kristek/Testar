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
import AuthReducer from "./redux/slicers/auth";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
export default store;


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
