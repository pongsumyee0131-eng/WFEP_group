"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEMO_NOTIFICATIONS = [
  {
    id: "1",
    title: "Milestone submitted",
    body: "Yuki uploaded Draft v2 for review",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment released",
    body: "$360 released for Concept milestone",
    time: "1d ago",
    read: true,
  },
];

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const unread = DEMO_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-sakura" />
        )}
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border/60 bg-card shadow-xl overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-border/50 font-medium text-sm">
                Notifications
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {DEMO_NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      "px-4 py-3 border-b border-border/30 text-sm hover:bg-accent/50 cursor-pointer",
                      !n.read && "bg-teal/5"
                    )}
                  >
                    <p className="font-medium">{n.title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{n.body}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
