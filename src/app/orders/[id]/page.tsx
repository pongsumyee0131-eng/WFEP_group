"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { createDemoOrder, type DemoOrder } from "@/lib/demo-order";
import { MilestoneTracker } from "@/components/orders/MilestoneTracker";
import { EscrowPanel } from "@/components/orders/EscrowPanel";
import { DeliveryPanel } from "@/components/orders/DeliveryPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [showDelivery, setShowDelivery] = useState(false);

  useEffect(() => {
    if (id === "demo-order" || id.startsWith("demo")) {
      setOrder(createDemoOrder());
      return;
    }
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.order) setOrder(d.order);
        else setOrder(createDemoOrder());
      })
      .catch(() => setOrder(createDemoOrder()));
  }, [id]);

  const handleApprove = async (milestoneId: string) => {
    if (!order) return;
    if (id !== "demo-order") {
      await fetch(`/api/milestones/${milestoneId}/approve`, { method: "POST" });
    }
    setOrder((prev) => {
      if (!prev) return prev;
      const milestones = prev.milestones.map((m) =>
        m.id === milestoneId
          ? { ...m, status: "APPROVED" as const, approvedAt: new Date() }
          : m
      );
      const released = milestones
        .filter((m) => m.status === "APPROVED")
        .reduce((s, m) => s + m.amount, 0);
      const allApproved = milestones.every((m) => m.status === "APPROVED");
      if (allApproved) setShowDelivery(true);
      return {
        ...prev,
        milestones,
        escrow: {
          ...prev.escrow,
          releasedAmount: released,
          heldAmount: prev.budget - released,
        },
      };
    });
  };

  if (!order) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
      </div>
    );
  }

  const allMilestonesApproved = order.milestones.every((m) => m.status === "APPROVED");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-teal mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
            <h1 className="font-serif text-2xl font-semibold mt-1">{order.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {order.client.name} → {order.freelancer.name}
            </p>
          </div>
          <Badge variant="teal">{order.status.replace(/_/g, " ")}</Badge>
        </div>
        <p className="mt-4 text-lg font-medium">{formatCurrency(order.budget)}</p>
        <p className="mt-2 text-sm text-muted-foreground">{order.brief}</p>
      </motion.div>

      <div className="mt-8">
        <EscrowPanel {...order.escrow} />
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold mb-4">Milestones</h2>
        <MilestoneTracker
          milestones={order.milestones}
          isClient
          onApprove={handleApprove}
          onRequestRevision={() => {}}
        />
      </section>

      <DeliveryPanel
        show={showDelivery || allMilestonesApproved}
        onAcceptRelease={() => {
          setOrder((prev) =>
            prev
              ? {
                  ...prev,
                  status: "COMPLETED",
                  escrow: {
                    ...prev.escrow,
                    heldAmount: 0,
                    releasedAmount: prev.budget,
                    status: "RELEASED",
                  },
                }
              : prev
          );
        }}
      />

      <div className="mt-8 flex gap-3">
        <Link href={`/messages?order=${order.id}`}>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Open chat
          </Button>
        </Link>
      </div>
    </div>
  );
}
