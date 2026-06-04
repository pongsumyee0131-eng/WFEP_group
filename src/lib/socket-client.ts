"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

/** Connect to Socket.io server when NEXT_PUBLIC_SOCKET_URL is configured */
export function getSocket(): Socket | null {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (!url) return null;

  if (!socket) {
    socket = io(url, {
      autoConnect: true,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
}

export function joinConversation(conversationId: string) {
  getSocket()?.emit("join", conversationId);
}

export function emitMessage(
  conversationId: string,
  payload: { content: string; senderId: string; senderName: string }
) {
  getSocket()?.emit("message", { conversationId, ...payload });
}

export function onMessage(callback: (msg: unknown) => void) {
  getSocket()?.on("message", callback);
  return () => {
    getSocket()?.off("message", callback);
  };
}
