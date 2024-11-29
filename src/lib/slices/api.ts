import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GetCommentsParams, GetCommentsResponse } from "@/types";

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
    addComment: builder.mutation({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, GetCommentsParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `comments?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useSubscribeMutation,
} = apiSlice;
