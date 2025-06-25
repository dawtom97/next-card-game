"use client";

import React from "react";

import { ChatSidebar, Message } from "@/components/sidebars/chat";

export default function Layout({ children }: { children: React.ReactNode }) {
  const messages = [
    {
      author: {
        id: "2137",
      },
      content: "Witaj! Jak mogę Ci pomóc?",
      id: "1",
    },
  ] as Message[];

  function handleSendMessage(text: string, username: string, userId: string) {}

  return (
    <>
      <main className="min-h-screen">{children}</main>
      <ChatSidebar messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
}
