"use client";

import { motion } from "framer-motion";
import { SakuraPetals } from "@/components/landing/SakuraPetals";

interface EditorialHeroProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function EditorialHero({ badge, title, subtitle }: EditorialHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-hero pattern-seigaiha border-b border-border/40">
      <SakuraPetals count={6} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:py-28 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal"
        >
          {badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
