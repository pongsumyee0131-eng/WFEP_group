"use client";

import { motion } from "framer-motion";
import { Check, Circle, Clock, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

type MilestoneItem = {
  id: string;
  stage: string;
  title: string;
  amount: number;
  status: string;
  feedback?: string | null;
  submissions?: { fileName: string }[];
};

interface MilestoneTrackerProps {
  milestones: MilestoneItem[];
  isClient?: boolean;
  isFreelancer?: boolean;
  onApprove?: (id: string) => void;
  onRequestRevision?: (id: string) => void;
}

const statusConfig: Record<string, { icon: typeof Check; color: string }> = {
  APPROVED: { icon: Check, color: "text-teal bg-teal/20" },
  SUBMITTED: { icon: Clock, color: "text-sakura-foreground bg-sakura/20" },
  IN_PROGRESS: { icon: Upload, color: "text-primary bg-primary/20" },
  PENDING: { icon: Circle, color: "text-muted-foreground bg-muted" },
  REVISION_REQUESTED: { icon: MessageSquare, color: "text-orange-600 bg-orange-100" },
};

export function MilestoneTracker({
  milestones,
  isClient,
  onApprove,
  onRequestRevision,
}: MilestoneTrackerProps) {
  return (
    <div className="space-y-4">
      {milestones.map((m, i) => {
        const config = statusConfig[m.status] ?? statusConfig.PENDING;
        const Icon = config.icon;
        const isActive = m.status === "SUBMITTED";

        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "rounded-2xl border p-5 transition-colors",
              isActive ? "border-teal/40 bg-teal/5" : "border-border/60 bg-card"
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", config.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {m.stage}
                    </p>
                    <h3 className="font-medium">{m.title}</h3>
                  </div>
                  <span className="text-sm font-medium text-teal">
                    {formatCurrency(m.amount)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground capitalize">
                  {m.status.replace(/_/g, " ").toLowerCase()}
                </p>
                {m.submissions && m.submissions.length > 0 && (
                  <ul className="mt-2 text-sm">
                    {m.submissions.map((s) => (
                      <li key={s.fileName} className="text-teal">
                        📎 {s.fileName}
                      </li>
                    ))}
                  </ul>
                )}
                {m.feedback && (
                  <p className="mt-2 text-sm italic text-muted-foreground">
                    Feedback: {m.feedback}
                  </p>
                )}
                {isClient && isActive && onApprove && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="default" onClick={() => onApprove(m.id)}>
                      Approve & Release {formatCurrency(m.amount)}
                    </Button>
                    {onRequestRevision && (
                      <Button size="sm" variant="outline" onClick={() => onRequestRevision(m.id)}>
                        Request Revision
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
