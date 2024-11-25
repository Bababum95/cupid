import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CUPID_PUBLIC_TOKEN = process.env.CUPID_PUBLIC_TOKEN;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      if (CUPID_PUBLIC_TOKEN) {
        headers.set("Authorization", `Bearer ${CUPID_PUBLIC_TOKEN}`);
      }
      return headers;
    },
  }),
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
