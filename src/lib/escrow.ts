import { prisma } from "@/lib/prisma";
import { EscrowStatus, MilestoneStatus, OrderStatus } from "@prisma/client";

/** Default milestone split: Concept 30%, Draft 40%, Final 30% */
export const MILESTONE_SPLITS = {
  CONCEPT: 0.3,
  DRAFT: 0.4,
  FINAL: 0.3,
} as const;

export async function createEscrowForOrder(orderId: string, totalAmount: number) {
  return prisma.escrowPayment.create({
    data: {
      orderId,
      totalAmount,
      heldAmount: totalAmount,
      releasedAmount: 0,
      status: EscrowStatus.HELD,
    },
  });
}

export async function createDefaultMilestones(orderId: string, budget: number) {
  const stages = [
    { stage: "CONCEPT" as const, title: "Concept & Direction", sortOrder: 0 },
    { stage: "DRAFT" as const, title: "Draft & Iteration", sortOrder: 1 },
    { stage: "FINAL" as const, title: "Final Delivery", sortOrder: 2 },
  ];

  return prisma.$transaction(
    stages.map((s) =>
      prisma.milestone.create({
        data: {
          orderId,
          stage: s.stage,
          title: s.title,
          amount: Math.round(budget * MILESTONE_SPLITS[s.stage] * 100) / 100,
          sortOrder: s.sortOrder,
          status: s.sortOrder === 0 ? MilestoneStatus.IN_PROGRESS : MilestoneStatus.PENDING,
        },
      })
    )
  );
}

export async function approveMilestoneAndRelease(milestoneId: string) {
  const milestone = await prisma.milestone.findUnique({
    where: { id: milestoneId },
    include: { order: { include: { escrow: true } } },
  });

  if (!milestone?.order.escrow) {
    throw new Error("Escrow not found");
  }

  const escrow = milestone.order.escrow;
  const releaseAmount = milestone.amount;
  const newReleased = escrow.releasedAmount + releaseAmount;
  const newHeld = escrow.heldAmount - releaseAmount;

  const allApproved = await prisma.milestone.count({
    where: {
      orderId: milestone.orderId,
      status: { not: MilestoneStatus.APPROVED },
      id: { not: milestoneId },
    },
  });

  await prisma.$transaction([
    prisma.milestone.update({
      where: { id: milestoneId },
      data: { status: MilestoneStatus.APPROVED, approvedAt: new Date() },
    }),
    prisma.escrowPayment.update({
      where: { id: escrow.id },
      data: {
        releasedAmount: newReleased,
        heldAmount: newHeld,
        status:
          newHeld <= 0
            ? EscrowStatus.RELEASED
            : EscrowStatus.PARTIALLY_RELEASED,
        fullyReleasedAt: newHeld <= 0 ? new Date() : undefined,
      },
    }),
    ...(allApproved === 0
      ? [
          prisma.order.update({
            where: { id: milestone.orderId },
            data: { status: OrderStatus.AWAITING_DELIVERY },
          }),
        ]
      : []),
  ]);

  return { released: releaseAmount, remaining: newHeld };
}

export async function releaseRemainingEscrow(orderId: string) {
  const escrow = await prisma.escrowPayment.findUnique({
    where: { orderId },
  });

  if (!escrow || escrow.heldAmount <= 0) {
    throw new Error("No funds to release");
  }

  const amount = escrow.heldAmount;

  await prisma.$transaction([
    prisma.escrowPayment.update({
      where: { orderId },
      data: {
        releasedAmount: escrow.totalAmount,
        heldAmount: 0,
        status: EscrowStatus.RELEASED,
        fullyReleasedAt: new Date(),
      },
    }),
    prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.COMPLETED,
        completedAt: new Date(),
      },
    }),
  ]);

  return amount;
}
