import { AnyAction, MiddlewareAPI } from "redux";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskServices from "../../services/task";
import SocketService from "../../services/socket";

const resolveAction = async (action: AnyAction, token: string) => {
  type actionType = keyof typeof TaskServices;
  const actionArray = action.type.split("/");

  const ActionCaused: actionType = actionArray[1];
  try {
    const res = (await TaskServices[ActionCaused](action.payload.index, token))
      .data;
    
    SocketService[ActionCaused](res);
    return {
      type: action.type,
      payload: { index: res },
    };
  } catch (err) {
    console.log(err);
    return {
      type: "task/failed",
      payload: err,
    };
  }
};
const OfflineActionMiddleware =
  (storeAPI: MiddlewareAPI) => (next: any) => async (action: AnyAction) => {
    const internet = await Network.getNetworkStateAsync();
    const actionArray = action.type.split("/");
    var newAction = action;
    if (
      actionArray[0] === "task" &&
      actionArray[1] !== "executeQuery" &&
      !(action.payload.options && action.payload.options.socket)
    ) {
      if (internet.isConnected) {
        const token = storeAPI.getState().auth.user.token;
        newAction = await resolveAction(action, token);
      } else {
        const currOfflineActions = JSON.parse(
          (await AsyncStorage.getItem("offlineactions")) ?? "[]"
        );
        await AsyncStorage.setItem(
          "offlineactions",
          JSON.stringify([...currOfflineActions, action])
        );
      }
    }
    let result = next(newAction);
    return result;
  };
export default OfflineActionMiddleware;

export const OfflineActionsResolve = async (dispatch: any, token: string) => {
  const actions: AnyAction[] = JSON.parse(
    (await AsyncStorage.getItem("offlineactions")) ?? "[]"
  );

  for (const action of actions) {
    dispatch(await resolveAction(action, token));
  }
  await AsyncStorage.setItem("offlineactions", "");
};
