import { createSlice } from "@reduxjs/toolkit";
export type AuthStepType = "step1" | "step2";

export interface AuthState {
  sidbar: boolean;
  settingsMenu: boolean;
}

const initialState: AuthState = {
  sidbar: false,
  settingsMenu: false,
};

const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidbar = !state.sidbar;
    },
    setSidebar: (state, action) => {
      state.sidbar = action.payload;
    },
    setSettingsMenu: (state, action) => {
      state.sidbar = action.payload;
    },
    toggleSettingsMenu: (state) => {
      state.settingsMenu = !state.settingsMenu;
    },
  },
});

export const {
  toggleSidebar,
  setSidebar,
  toggleSettingsMenu,
  setSettingsMenu,
} = modelsSlice.actions;
export default modelsSlice.reducer;
