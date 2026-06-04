/** In-memory chat store for demo / dev without DB persistence */

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  version?: number;
  createdAt: string;
};

const conversations = new Map<string, ChatMessage[]>();

function convId(orderId?: string, withUser?: string) {
  return orderId ? `order-${orderId}` : withUser ? `dm-${withUser}` : "general";
}

export function getMessages(conversationId: string): ChatMessage[] {
  return conversations.get(conversationId) ?? getSeedMessages(conversationId);
}

function getSeedMessages(conversationId: string): ChatMessage[] {
  const seed: ChatMessage[] = [
    {
      id: "seed-1",
      conversationId,
      senderId: "mock-1",
      senderName: "Yuki Tanaka",
      content: "Thank you for the brief! I'll start on concept directions today.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "seed-2",
      conversationId,
      senderId: "client",
      senderName: "You",
      content: "Great — please lean into minimalist, wabi-sabi aesthetics.",
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "seed-3",
      conversationId,
      senderId: "mock-1",
      senderName: "Yuki Tanaka",
      content: "Uploaded draft v2 for your milestone review.",
      fileName: "drafts-v2.zip",
      fileUrl: "#",
      version: 2,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
  conversations.set(conversationId, seed);
  return seed;
}

export function addMessage(
  conversationId: string,
  msg: Omit<ChatMessage, "id" | "createdAt" | "conversationId">
): ChatMessage {
  const list = getMessages(conversationId);
  const newMsg: ChatMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    conversationId,
    createdAt: new Date().toISOString(),
  };
  list.push(newMsg);
  conversations.set(conversationId, list);
  return newMsg;
}

export function resolveConversationId(params: {
  order?: string | null;
  with?: string | null;
}) {
  return convId(params.order ?? undefined, params.with ?? undefined);
}
