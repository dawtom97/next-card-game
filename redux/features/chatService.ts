import { io, Socket } from "socket.io-client";

class ChatService {
  public socket: Socket | null = null;

  connect(): void {
    if (this.socket) {
      console.warn("Already connected to the chat service");
      return;
    }

    this.socket = io("http://localhost:3000", {
      withCredentials: true,
      auth: {
        token: "Bearer 685c1031a26c0e074428852a",
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to the chat service");
    });
    this.socket.on("identify", (x) => {
      console.log(x);
    });
  }

  disconnect(): void {
    if (!this.socket) {
      console.warn("Not connected to the chat service");
      return;
    }

    this.socket.disconnect();
    this.socket = null;
  }
}

export const chatService = new ChatService();
