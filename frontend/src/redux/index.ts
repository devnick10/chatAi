import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modelsReducer from "./features/sidebar/sidebarSlice";
import { serviceApi } from "./service/service";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      modles: modelsReducer,
      [serviceApi.reducerPath]: serviceApi.reducer,
    },
    middleware: (getdefaultMiddleware) => {
      return getdefaultMiddleware({
        serializableCheck: false,
      }).concat(serviceApi.middleware);
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
