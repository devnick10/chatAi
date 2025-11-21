import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AuthStepType = "step1" | "step2";

export interface AuthState {
  user: { email: string } | null;
  step: AuthStepType;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  step: "step1",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitiate_signin: (state, action: PayloadAction<{ step: AuthStepType }>) => {
      const { step } = action.payload;
      state.step = step;
    },
    setSignin: (state) => {
      state.isAuthenticated = true;
      state.step = "step1";
    },
    setUser: (state, action: PayloadAction<{ user: { email: string } }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    resendOtpState: (state) => {
      state.step = "step1";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSignin, logout, setInitiate_signin, setUser, resendOtpState } =
  authSlice.actions;
export default authSlice.reducer;
