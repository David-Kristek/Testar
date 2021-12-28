export enum MessageActions {
  SET_MESSAGE = "SET_MESSAGE",
  CLEAR_MESSAGE = "CLEAR_MESSAGE",
}

export type MessageAction<PayLoadType> = {
  type: MessageActions;
  payload?: PayLoadType;
};
