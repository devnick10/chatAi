import { createSlice } from "@reduxjs/toolkit";
export type AuthStepType = "step1" | "step2";

export interface AuthState {
  sidbar: boolean;
}

const initialState: AuthState = {
  sidbar: false,
};

const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidbar = !state.sidbar;
    },
  },
});

export const { toggleSidebar } = modelsSlice.actions;
export default modelsSlice.reducer;
