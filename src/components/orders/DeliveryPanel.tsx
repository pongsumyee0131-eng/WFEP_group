"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeliveryPanelProps {
  show?: boolean;
  onAcceptRelease?: () => void;
}

export function DeliveryPanel({ show = false, onAcceptRelease }: DeliveryPanelProps) {
  const [released, setReleased] = useState(false);

  if (!show) return null;

  const handleRelease = () => {
    onAcceptRelease?.();
    setReleased(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="rounded-2xl border border-sakura/30 bg-sakura/5 p-6 mt-6"
      >
        <h3 className="font-serif text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5 text-sakura-foreground" />
          Final delivery
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          High-resolution files with preview watermarks. Review period: 5 days.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            brand-final.zip (watermarked preview)
          </li>
          <li className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            source-files.ai (releases on acceptance)
          </li>
        </ul>
        {!released ? (
          <Button
            variant="sakura"
            className="mt-6 w-full sm:w-auto"
            onClick={handleRelease}
          >
            Accept & Release Payment
          </Button>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 flex items-center gap-2 text-teal font-medium"
          >
            <CheckCircle className="h-5 w-5" />
            Payment released — thank you! Please leave a review.
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
