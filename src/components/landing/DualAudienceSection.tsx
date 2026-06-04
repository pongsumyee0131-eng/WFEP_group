"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DualAudienceSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/60 bg-gradient-to-br from-teal/10 to-transparent p-8 lg:p-10"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-teal">
              For clients
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold">
              Hire with confidence
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Browse curated portfolios, send detailed briefs, and pay into escrow. Approve work
              at each milestone before funds release — no surprises.
            </p>
            <Link href="/projects/new" className="mt-6 inline-block">
              <Button variant="navy" size="lg">
                Post a Project
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/60 bg-gradient-to-br from-sakura/15 to-transparent p-8 lg:p-10"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-sakura-foreground">
              For freelancers
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold">
              Showcase your craft
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Build a stunning portfolio, offer service packages, and get paid reliably through
              milestone releases. Focus on creating — we handle the rest.
            </p>
            <Link href="/onboarding" className="mt-6 inline-block">
              <Button variant="sakura" size="lg">
                Join as Freelancer
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
