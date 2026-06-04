"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "@/lib/chat-store";

export function useChat(conversationId: string | null, pollMs = 3000) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    const params = conversationId.startsWith("order-")
      ? `order=${conversationId.replace("order-", "")}`
      : `with=${conversationId.replace("dm-", "")}`;
    const res = await fetch(`/api/messages?${params}`);
    const data = await res.json();
    setMessages(data.messages ?? []);
    setLoading(false);
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, pollMs);
    return () => clearInterval(interval);
  }, [fetchMessages, pollMs]);

  const sendMessage = async (content: string, extras?: Partial<ChatMessage>) => {
    if (!conversationId) return;
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        content,
        senderId: "client",
        senderName: "You",
        ...extras,
      }),
    });
    const data = await res.json();
    if (data.message) {
      setMessages((prev) => [...prev, data.message]);
    }
    return data.message;
  };

  return { messages, loading, sendMessage, refresh: fetchMessages };
}
