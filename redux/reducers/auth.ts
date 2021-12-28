import { AnyAction, Reducer } from "redux";
import { AuthAction, AuthActions } from "../actions/auth";

type AuthState = {
  logged: boolean;
  user: User;
};
const userInitialState: User = {
  username: "",
  groupname: "",
  token: "",
  email: "",
};
export const initialAuthState: AuthState = {
  logged: false,
  user: userInitialState,
};

const authReducer: Reducer<AuthState, AuthAction<AuthState>> = (
  state = initialAuthState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActions.LOGIN_SUCCESS:      
      return {
        ...state,
        logged: true,
        user: payload ? payload.user : userInitialState,
      };
      case AuthActions.WAIT_FOR_VERIFY:
      return {
        ...state,
        logged: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        logged: false,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        logged: false,
      };
    case AuthActions.REGISTER_SUCCESS:
      return {
        ...state,
        logged: false,
      };
    case AuthActions.REGISTER_FAIL:
      return {
        ...state,
        logged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
