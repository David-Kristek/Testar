import { Reducer } from "redux";
import { MessageAction, MessageActions } from "../actions/message";

type messageState = {
  message: any;
};
const initialState = {
  message: {},
};

const messageReducer: Reducer<messageState, MessageAction<messageState>> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case MessageActions.SET_MESSAGE:      
      return { message: payload };

    case MessageActions.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
};
export default messageReducer;
