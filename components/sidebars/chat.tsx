"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useGetAllUsersQuery } from "@/redux/services/user";

export interface Message {
  id: string;
  content: string;
  author: {
    id: string;
  };
}

export function ChatSidebar({
  messages = [],
  onSetRecipient = () => {},
  onSendMessage,
}: {
  messages?: Message[];

  onSendMessage?: (msg: string) => void;
  onSetRecipient?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [open, setOpen] = React.useState(true);
  const [input, setInput] = React.useState("");


  const {data: users}= useGetAllUsersQuery(null);

  console.log(users)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onSendMessage) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg"
        >
          <MessageCircle size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col w-[350px] max-w-full p-0"
      >
        <div className="border-b p-4 flex items-center justify-between">
          <div className="font-bold text-lg">Czat</div>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center mt-8">
              Brak wiadomości
            </p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="mb-2">
                <span className="font-semibold">{m.author.id}: </span>
                <span>{m.content}</span>
              </div>
            ))
          )}
        </ScrollArea>
        <form onSubmit={handleSend} className="border-t p-4 space-y-2">
          <select onChange={onSetRecipient}>
            {users?.map((user) => (
              <option key={user.id} value={JSON.stringify({ id: user.id, username: user.username })}>
                {user.username}
              </option>
            ))}
          </select>
          <Input
            placeholder="Napisz wiadomość..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim()}>
            Wyślij
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
