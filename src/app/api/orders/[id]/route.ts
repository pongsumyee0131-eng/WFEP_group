import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUserFromClerk } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await syncUserFromClerk();
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        OR: user ? [{ clientId: user.id }, { freelancerId: user.id }] : undefined,
      },
      include: {
        milestones: {
          orderBy: { sortOrder: "asc" },
          include: { submissions: true },
        },
        escrow: true,
        delivery: { include: { files: true } },
        client: { select: { id: true, name: true, email: true } },
        freelancer: { select: { id: true, name: true, email: true } },
      },
    });

    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }
}
