import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    getMe: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMeQuery } = user;
