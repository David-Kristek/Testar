// https://github.com/bezkoder/react-redux-hooks-jwt-auth/blob/28a25f525aee8f6a73f2bd1165c0b868aeedb7b5/src/actions/auth.js#L49
export enum AuthActions {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGOUT = "LOGOUT",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  WAIT_FOR_VERIFY = "WAIT_FOR_VERIFY",
}

import * as AuthService from "../../services/auth";
import { MessageActions } from "./message";
import { AppDispatch } from "../../store";
import { AppThunk, AuthResponse } from "../reduxTypes";

export type AuthAction<PayLoadType> = {
  type: AuthActions;
  payload?: PayLoadType;
};
// export const login: Action<User> = {
//   type: ActionKind.Login,
//   payload: null,
// };

export const register =
  ({
    username,
    email,
    groupname,
    bakalariusername,
    bakalaripassword,
  }: AuthService.registerProps): AppThunk<Promise<any>> =>
  async (dispatch: AppDispatch) => {
    try {
      const asyncResp = await AuthService.register({
        username,
        email,
        groupname,
        bakalariusername,
        bakalaripassword,
      });
      if (asyncResp.data.waitForVerify)
        dispatch({
          type: AuthActions.WAIT_FOR_VERIFY,
        });
      else
        dispatch({
          type: AuthActions.REGISTER_SUCCESS,
        });
      return asyncResp.data;
    } catch (error: any) {
      console.log(error.data);
      dispatch({
        type: AuthActions.REGISTER_FAIL,
      });
      throw error.response.data;
    }
  };
export interface Action<T = any> {
  type: T;
}
export const login =
  ({
    username,
    email,
    groupname,
  }: AuthService.loginProps): AppThunk<Promise<any>> =>
  async (dispatch: AppDispatch) => {
    try {
      const asyncResp = await AuthService.login({ username, email, groupname });
      if (asyncResp.data.waitForVerify)
        dispatch({
          type: AuthActions.WAIT_FOR_VERIFY,
        });
      else
        dispatch({
          type: AuthActions.LOGIN_SUCCESS,
          payload: { user: asyncResp.data.user },
        });
      return asyncResp.data;
    } catch (error: any) {
      dispatch({
        type: AuthActions.LOGIN_FAIL,
      });
      throw error.response.data;
    }
  };
export const logout = (dispatch: AppDispatch) => {
  dispatch({ type: AuthActions.LOGOUT });
  // AsyncStorage.clear()
};
