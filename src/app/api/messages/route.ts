import { NextResponse } from "next/server";
import {
  addMessage,
  getMessages,
  resolveConversationId,
} from "@/lib/chat-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = resolveConversationId({
    order: searchParams.get("order"),
    with: searchParams.get("with"),
  });
  return NextResponse.json({ messages: getMessages(conversationId), conversationId });
}

export async function POST(req: Request) {
  const body = await req.json();
  const conversationId =
    body.conversationId ??
    resolveConversationId({ order: body.orderId, with: body.withUserId });

  const message = addMessage(conversationId, {
    senderId: body.senderId ?? "client",
    senderName: body.senderName ?? "You",
    content: body.content,
    fileUrl: body.fileUrl,
    fileName: body.fileName,
    version: body.version,
  });

  return NextResponse.json({ message });
}
