import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { releaseRemainingEscrow } from "@/lib/escrow";
import { syncUserFromClerk } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await syncUserFromClerk();
    const { id } = await params;

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order || order.clientId !== user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const amount = await releaseRemainingEscrow(id);
    return NextResponse.json({ success: true, released: amount });
  } catch (error) {
    console.error("Release escrow:", error);
    return NextResponse.json({ error: "Failed to release" }, { status: 500 });
  }
}
