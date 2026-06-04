"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Star, Clock } from "lucide-react";

const signals = [
  {
    icon: Shield,
    title: "Escrow protection",
    description: "Payments held securely until you approve each milestone and final delivery.",
  },
  {
    icon: Lock,
    title: "Secure delivery",
    description: "Preview watermarks and expiring download links protect your work until release.",
  },
  {
    icon: Star,
    title: "Verified reviews",
    description: "Authentic ratings from completed projects — build trust on both sides.",
  },
  {
    icon: Clock,
    title: "Clear timelines",
    description: "Concept → Draft → Final stages with revision policies you agree on upfront.",
  },
];

export function TrustSection() {
  return (
    <section id="escrow" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl font-semibold">Built on trust</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Our milestone escrow system keeps freelancers and clients aligned at every step.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-border/50 bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/15">
                <s.icon className="h-6 w-6 text-teal" />
              </div>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
