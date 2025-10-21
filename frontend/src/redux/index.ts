import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { serviceApi } from './service/service';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
    },
    middleware: (getdefaultMiddleware) => {
        return getdefaultMiddleware({
            serializableCheck: false
        }).concat(serviceApi.middleware)
    }
    ,
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
