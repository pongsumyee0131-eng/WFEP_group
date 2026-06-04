import type { Milestone, Order } from "@prisma/client";

export type DemoMilestone = Milestone & { submissions: { fileName: string; fileUrl: string }[] };
export type DemoOrder = Order & {
  milestones: DemoMilestone[];
  escrow: {
    totalAmount: number;
    heldAmount: number;
    releasedAmount: number;
    status: string;
  };
  client: { name: string };
  freelancer: { name: string };
};

export function createDemoOrder(freelancerName = "Yuki Tanaka"): DemoOrder {
  const budget = 1200;
  return {
    id: "demo-order",
    orderNumber: "CL-DEMO-001",
    clientId: "demo-client",
    freelancerId: "mock-1",
    servicePackageId: "s2",
    title: "Full Brand Identity",
    brief: "Complete visual identity for artisan tea brand.",
    budget,
    status: "IN_PROGRESS",
    revisionLimit: 3,
    revisionsUsed: 0,
    reviewDeadline: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    acceptedAt: new Date(),
    completedAt: null,
    client: { name: "Demo Client" },
    freelancer: { name: freelancerName },
    escrow: {
      totalAmount: budget,
      heldAmount: 840,
      releasedAmount: 360,
      status: "PARTIALLY_RELEASED",
    },
    milestones: [
      {
        id: "m1",
        orderId: "demo-order",
        stage: "CONCEPT",
        title: "Concept & Direction",
        description: "Mood boards and direction",
        amount: 360,
        status: "APPROVED",
        dueDate: null,
        submittedAt: new Date(),
        approvedAt: new Date(),
        feedback: null,
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        submissions: [{ fileName: "concepts.pdf", fileUrl: "#" }],
      },
      {
        id: "m2",
        orderId: "demo-order",
        stage: "DRAFT",
        title: "Draft & Iteration",
        description: "Logo drafts and iterations",
        amount: 480,
        status: "SUBMITTED",
        dueDate: null,
        submittedAt: new Date(),
        approvedAt: null,
        feedback: null,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        submissions: [{ fileName: "drafts-v2.zip", fileUrl: "#" }],
      },
      {
        id: "m3",
        orderId: "demo-order",
        stage: "FINAL",
        title: "Final Delivery",
        description: "Final files and brand book",
        amount: 360,
        status: "PENDING",
        dueDate: null,
        submittedAt: null,
        approvedAt: null,
        feedback: null,
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        submissions: [],
      },
    ],
  };
}
