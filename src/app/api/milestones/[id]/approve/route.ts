import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { approveMilestoneAndRelease } from "@/lib/escrow";
import { prisma } from "@/lib/prisma";
import { syncUserFromClerk } from "@/lib/auth";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await syncUserFromClerk();
    const { id } = await params;

    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!milestone || milestone.order.clientId !== user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const result = await approveMilestoneAndRelease(id);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Approve milestone:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
