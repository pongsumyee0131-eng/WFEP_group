"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EditorialHero } from "./EditorialHero";
import { ScrollReveal } from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X } from "lucide-react";

export function PortfolioTipsContent() {
  const t = useTranslations("portfolioTips");
  const [flipped, setFlipped] = useState<number | null>(null);

  const steps = [1, 2, 3, 4, 5] as const;
  const examples = [1, 2, 3] as const;

  return (
    <>
      <EditorialHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-center">{t("stepsTitle")}</h2>
        </ScrollReveal>
        <div className="mt-12 space-y-8">
          {steps.map((n, i) => (
            <ScrollReveal key={n} delay={i * 0.06}>
              <div className="flex gap-6 rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/15 font-serif text-lg text-teal">
                  {n}
                </span>
                <div>
                  <h3 className="font-medium text-lg">{t(`step${n}Title`)}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{t(`step${n}Desc`)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/20 py-20 border-y border-border/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-2xl font-semibold">{t("beforeAfterTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("beforeAfterSubtitle")}</p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {examples.map((n, i) => (
              <ScrollReveal key={n} delay={i * 0.08}>
                <motion.button
                  type="button"
                  onClick={() => setFlipped(flipped === n ? null : n)}
                  className="w-full text-left"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative min-h-[200px] rounded-2xl border border-border/60 bg-card overflow-hidden p-6">
                    <AnimatePresence mode="wait">
                      {flipped === n ? (
                        <motion.div
                          key="after"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex flex-col justify-between h-full min-h-[168px] bg-teal/5 -m-6 p-6 rounded-2xl"
                        >
                          <div className="flex items-center gap-2 text-teal">
                            <Check className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase">{t("after")}</span>
                          </div>
                          <p className="text-sm text-foreground mt-4">{t(`example${n}After`)}</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="before"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex flex-col justify-between h-full min-h-[168px]"
                        >
                          <div className="flex items-center gap-2 text-sakura-foreground">
                            <X className="h-4 w-4" />
                            <span className="text-xs font-medium uppercase">{t("before")}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-4">{t(`example${n}Before`)}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ScrollReveal>
          <p className="text-muted-foreground">{t("cta")}</p>
          <Link href="/dashboard" className="mt-6 inline-block">
            <Button variant="navy" size="lg" className="group">
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
