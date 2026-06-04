"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resolveConversationId } from "@/lib/chat-store";

interface ChatWindowProps {
  orderId?: string | null;
  withUserId?: string | null;
}

export function ChatWindow({ orderId, withUserId }: ChatWindowProps) {
  const conversationId = resolveConversationId({ order: orderId, with: withUserId });
  const { messages, loading, sendMessage } = useChat(conversationId);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col rounded-2xl border border-border/60 bg-card overflow-hidden">
      <div className="border-b border-border/50 px-4 py-3 bg-secondary/30">
        <p className="font-medium text-sm">Project conversation</p>
        <p className="text-xs text-muted-foreground">Real-time updates · file version history</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">Loading messages...</p>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isMe = m.senderId === "client";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", isMe ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                      isMe
                        ? "bg-teal text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    )}
                  >
                    {!isMe && (
                      <p className="text-xs font-medium mb-1 opacity-70">{m.senderName}</p>
                    )}
                    <p>{m.content}</p>
                    {m.fileName && (
                      <p className="mt-1 text-xs underline opacity-80">
                        📎 {m.fileName}
                        {m.version != null && ` (v${m.version})`}
                      </p>
                    )}
                    <p className="mt-1 text-[10px] opacity-60">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="border-t border-border/50 p-3 flex gap-2 bg-background/80"
      >
        <Button type="button" variant="ghost" size="icon" aria-label="Attach file">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="rounded-full flex-1"
        />
        <Button type="submit" size="icon" variant="default" aria-label="Send">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
