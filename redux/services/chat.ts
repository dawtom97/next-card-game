import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Message {
  userId: string;
  username: string;
  content: string;
}

interface PaginatedMessages {
  data: Message[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/messages",
    credentials: "include",
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    createMessage: builder.mutation<Message, Message>({
      query: (message) => ({
        url: "/send",
        method: "POST",
        body: message,
      }),
      // invalidatesTags: ["Messages"],
    }),
    getConversationMessages: builder.query<
      PaginatedMessages,
      {
        authorId: string;
        recipientId: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({ authorId, recipientId, page = 1, pageSize = 20 }) => ({
        url: `/conversation`,
        method: "GET",
        params: { authorId, recipientId, page, pageSize },
      }),
      // providesTags: (result, error, { authorId, recipientId }) => [
      //   { type: "Messages", id: `${authorId}-${recipientId}` },
      // ],
    }),
  }),
});

export const { useCreateMessageMutation, useGetConversationMessagesQuery } =
  chatApi;
