"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChatWindow } from "@/components/chat/ChatWindow";

function MessagesContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const withUser = searchParams.get("with");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-serif text-3xl font-semibold">Messages</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Chat with file sharing and version history for each project
        </p>
      </motion.div>
      <ChatWindow orderId={orderId} withUserId={withUser} />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading chat...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
