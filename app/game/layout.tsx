"use client";

import React, { useEffect } from "react";

import { ChatSidebar, Message } from "@/components/sidebars/chat";
import { chatService } from "@/redux/features/chatService";
import {
  useCreateMessageMutation,
  useGetConversationMessagesQuery,
} from "@/redux/services/chat";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [createMessage, { data, error, loading }] = useCreateMessageMutation();
  const { data: mess, isLoading } = useGetConversationMessagesQuery({
    authorId: "685c1031a26c0e074428852a",
    recipientId: "685c1031a26c0e074428852a",
  });
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    // Import the chat service and connect to it
    chatService.connect();
    chatService.socket?.on("message", (x) => {
      setMessages((prev) => [...prev, x]);
    });
    return () => {
      chatService.disconnect();
    };
  }, []);

  function handleSendMessage(
    content: string,
    username: string,
    userId: string
  ) {
    const message = {
      userId,
      username,
      content,
    };
    console.log("Sending message:", message);
    createMessage(message);
  }

  return (
    <>
      <main className="min-h-screen">
        {children}
      </main>
      <ChatSidebar messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
}
