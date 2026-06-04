/**
 * Optional Socket.io server for real-time chat.
 * Run separately: npx tsx server/socket.ts
 * Set NEXT_PUBLIC_SOCKET_URL=http://localhost:3001 in .env
 */
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = parseInt(process.env.SOCKET_PORT ?? "3001", 10);

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000" },
});

io.on("connection", (socket) => {
  socket.on("join", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on(
    "message",
    (payload: {
      conversationId: string;
      content: string;
      senderId: string;
      senderName: string;
    }) => {
      io.to(payload.conversationId).emit("message", {
        ...payload,
        id: `socket-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    }
  );
});

httpServer.listen(PORT, () => {
  console.log(`CraftLink Socket.io server on :${PORT}`);
});
