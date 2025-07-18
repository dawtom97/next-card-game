import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const card = createApi({
  reducerPath: "card",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/card",
    credentials: "include",
  }),
  tagTypes: ["Card"],
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (cardData) => ({
        url: "/create",
        method: "POST",
        body: cardData,
      }),
      invalidatesTags: ["Card"],
    }),
    getAllCards: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Card"],
    }),
  }),

});

export const { useCreateCardMutation, useGetAllCardsQuery } = card;