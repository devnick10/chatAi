import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    initiate_signin,
    logout,
    setUser,
    signin
} from "../features/auth/authSlice";

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
        credentials: "include"
    }),
    keepUnusedDataFor: 60 * 60 * 24 * 7,
    tagTypes: ["Me", "user", "chats"],
    endpoints: (builder) => ({
        initiate_signin: builder.mutation({
            query: (data) => ({
                url: "/auth/initiate_signin",
                method: "POST",
                body: data
            }),
            async onQueryStarted(
                _,
                {
                    dispatch,
                    queryFulfilled,
                },
            ) {
                const { data } = await queryFulfilled;
                if (data.success) {
                    dispatch(initiate_signin({ step: "step2" }))
                }
            },
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Me"],
            async onQueryStarted(
                _,
                {
                    dispatch,
                    queryFulfilled,
                },
            ) {
                const { data } = await queryFulfilled;
                if (data.success) {
                    dispatch(signin())
                }
            },
        }),
        myInfo: builder.query({
            query: (token: string) => ({
                url: "/auth/me",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ["Me"],
            async onQueryStarted(
                _,
                {
                    dispatch,
                    queryFulfilled
                }
            ) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data))
                } catch (error) {
                    dispatch(logout());
                }
            }
        }),
        signOut: builder.query({
            query: () => ({
                url: "/auth/signout",
                method: "GET",
            }),
        }),
    })
})

export const {
    useInitiate_signinMutation,
    useSigninMutation,
    useMyInfoQuery,
    useSignOutQuery
} = serviceApi;