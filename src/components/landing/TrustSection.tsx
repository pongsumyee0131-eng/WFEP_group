"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Lock, Star, Clock } from "lucide-react";

export function TrustSection() {
  const t = useTranslations("landing");

  const signals = [
    { icon: Shield, title: t("trustEscrowTitle"), description: t("trustEscrowDesc") },
    { icon: Lock, title: t("trustDeliveryTitle"), description: t("trustDeliveryDesc") },
    { icon: Star, title: t("trustReviewsTitle"), description: t("trustReviewsDesc") },
    { icon: Clock, title: t("trustTimelineTitle"), description: t("trustTimelineDesc") },
  ];

  return (
    <section id="escrow" className="py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl font-semibold">{t("trustTitle")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("trustSubtitle")}</p>
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
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
