import { combineReducers } from "redux";
import auth from "./reducers/auth";
import message from "./reducers/message";

const rootReducer = combineReducers({
  auth,
  message,
});
export default rootReducer; 
