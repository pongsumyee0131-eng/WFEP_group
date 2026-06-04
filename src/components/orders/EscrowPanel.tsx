"use client";

import { motion } from "framer-motion";
import { Shield, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface EscrowPanelProps {
  totalAmount: number;
  heldAmount: number;
  releasedAmount: number;
  status: string;
}

export function EscrowPanel({
  totalAmount,
  heldAmount,
  releasedAmount,
  status,
}: EscrowPanelProps) {
  const pctReleased = totalAmount > 0 ? (releasedAmount / totalAmount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-teal/30 bg-teal/5 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-teal" />
        <h3 className="font-medium">Escrow protection</h3>
        <span className="ml-auto text-xs rounded-full bg-teal/20 px-2 py-0.5 text-teal capitalize">
          {status.replace(/_/g, " ").toLowerCase()}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center sm:text-left sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="font-semibold">{formatCurrency(totalAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Released</p>
          <p className="font-semibold text-teal">{formatCurrency(releasedAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">In escrow</p>
          <p className="font-semibold">{formatCurrency(heldAmount)}</p>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctReleased}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-teal rounded-full"
        />
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Wallet className="h-3.5 w-3.5" />
        Funds release only when you approve milestones or final delivery
      </p>
    </motion.div>
  );
}
