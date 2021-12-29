import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import * as AuthService from "../../services/auth";

type AuthState =
  | {
      logged: false;
      user: null;
      status: any;
    }
  | { logged: true; user: User; status?: any };

export const initialAuthState = {
  logged: false,
} as AuthState;
export const login = createAsyncThunk(
  "auth/login",
  async (loginData: AuthService.loginProps, thunkAPI) => {
    const validation = AuthService.validateLoginData(loginData);
    if (!validation.OK)
      return thunkAPI.rejectWithValue({ status: validation.error });
    try {
      const asyncResp = await AuthService.login(loginData);
      const { waitForVerify, user } = asyncResp.data;
      return { status: { waitForVerify }, user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ status: error.response.data });
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (registerData: AuthService.registerProps, thunkAPI) => {
    const validation = AuthService.validateRegisterData(registerData);
    if (!validation.OK)
      return thunkAPI.rejectWithValue({ status: validation.error });
    try {
      const asyncResp = await AuthService.register(registerData);
      const { waitForVerify, user } = asyncResp.data;
      return { status: { waitForVerify }, user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ status: error.response.data });
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.logged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled, (state, action: PayloadAction<AuthState>) => {
        if (!!action.payload.status && !!action.payload.status.waitForVerify) {
          state.logged = false;
          state.status = { waitForVerify: true };
        } else {
          state.logged = true;
          state.user = action.payload.user;
        }
      })
      .addMatcher(isRejected, (state, action: PayloadAction<AuthState>) => {
        state.status = action.payload.status;
        state.logged = false;
      });
  },
});
export default authSlice.reducer;
// web turtorial
// https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
// bezcoder
// https://github.com/bezkoder/react-redux-login-example/blob/master/src/slices/auth.js
// auth example
// https://github.com/dwiyatci/redux-toolkit-login-flow/tree/master/src/features/signin
// posts
// https://github.com/MohammedAl-Rowad/react-redux-toolkit-yt/blob/main/src/features/posts/postsSlice.js
