import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (body) => ({
        url: "subscribe",
        method: "POST",
        body,
      }),
    }),
    comments: builder.mutation({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation, useCommentsMutation } = apiSlice;
