"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { EditorialHero } from "./EditorialHero";
import { ScrollReveal } from "./ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield } from "lucide-react";

const accordionKeys = ["escrow", "milestone", "ip", "dispute", "delivery"] as const;

export function TrustSafetyContent() {
  const t = useTranslations("trustSafety");

  return (
    <>
      <EditorialHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
              <Shield className="h-8 w-8 text-teal" />
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {accordionKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <AccordionItem
                  value={key}
                  className="rounded-2xl border border-border/60 bg-card px-6 mb-3 border-b-0 data-[state=open]:border-teal/30 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="font-medium hover:no-underline py-5">
                    {t(`accordion.${key}Title`)}
                  </AccordionTrigger>
                  <AccordionContent>{t(`accordion.${key}Content`)}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </ScrollReveal>
      </section>
    </>
  );
}
