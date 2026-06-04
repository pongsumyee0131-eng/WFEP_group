import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUserFromClerk } from "@/lib/auth";
import { createDefaultMilestones, createEscrowForOrder } from "@/lib/escrow";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await syncUserFromClerk();
    if (!client || client.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Only clients can create orders" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { freelancerId, servicePackageId, title, brief, budget } = body;

    if (!freelancerId || !title || !brief || !budget) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          clientId: client.id,
          freelancerId,
          servicePackageId: servicePackageId || null,
          title,
          brief,
          budget: Number(budget),
          status: OrderStatus.PENDING,
        },
      });

      await createEscrowForOrder(created.id, Number(budget));
      await createDefaultMilestones(created.id, Number(budget));

      return created;
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Create order:", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await syncUserFromClerk();
    if (!user) return NextResponse.json({ orders: [] });

    const orders = await prisma.order.findMany({
      where: {
        OR: [{ clientId: user.id }, { freelancerId: user.id }],
      },
      include: {
        milestones: { orderBy: { sortOrder: "asc" } },
        escrow: true,
        client: { select: { name: true, email: true } },
        freelancer: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
