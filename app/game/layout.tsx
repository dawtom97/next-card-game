"use client";

import React, { useEffect, useState } from "react";

import { ChatSidebar, Message } from "@/components/sidebars/chat";
import { chatService } from "@/redux/features/chatService";
import {
  useCreateMessageMutation,
  useGetConversationMessagesQuery,
} from "@/redux/services/chat";
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userId = Cookies.get("userId");
  const [recipientId, setRecipientId] = useState("");
  const [createMessage] = useCreateMessageMutation();
  const { data: mess, isLoading } = useGetConversationMessagesQuery({
    authorId: userId || "",
    recipientId,
  });
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [username, setUsername] = React.useState("");

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

  function handleSetRecipient(e: Event) {
    const target = e.target as HTMLInputElement;
    const { username, id } = JSON.parse(target.value);
    if (target) {
      setRecipientId(id);
      setUsername(username);
      console.log(e);
    }
  }

  function handleSendMessage(content: string) {
    const message = {
      userId: userId || "",
      username,
      content,
    };

    createMessage(message);
  }

  return (
    <>
      <main className="min-h-screen">{children}</main>
      <ChatSidebar
        onSetRecipient={handleSetRecipient}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </>
  );
}
