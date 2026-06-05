"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { EditorialHero } from "./EditorialHero";
import { ScrollReveal } from "./ScrollReveal";

export function AboutContent() {
  const t = useTranslations("about");

  const timeline = [1, 2, 3] as const;
  const values = [1, 2, 3] as const;

  return (
    <>
      <EditorialHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-teal">{t("takumiTitle")}</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("takumiDesc")}</p>
        </ScrollReveal>
      </section>

      <section className="bg-secondary/20 py-20 border-y border-border/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-2xl font-semibold">{t("timelineTitle")}</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border/60 sm:-translate-x-px" />
            {timeline.map((n, i) => (
              <ScrollReveal key={n} delay={i * 0.1}>
                <motion.div
                  className={`relative flex flex-col sm:flex-row gap-6 mb-16 last:mb-0 ${
                    i % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="sm:w-1/2 sm:pr-12 sm:text-right flex sm:justify-end">
                    <span className="inline-flex h-8 min-w-[4rem] items-center justify-center rounded-full bg-teal/15 px-3 text-sm font-medium text-teal">
                      {t(`timeline${n}Year`)}
                    </span>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-teal border-2 border-background -translate-x-1.5 sm:-translate-x-1.5 top-1" />
                  <div className={`sm:w-1/2 pl-12 sm:pl-8 ${i % 2 === 1 ? "sm:pr-8 sm:pl-0" : ""}`}>
                    <h3 className="font-medium text-lg">{t(`timeline${n}Title`)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {t(`timeline${n}Desc`)}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-serif text-2xl font-semibold">{t("valuesTitle")}</h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((n, i) => (
            <ScrollReveal key={n} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border/50 bg-card p-6 text-center h-full"
              >
                <h3 className="font-serif font-semibold">{t(`value${n}Title`)}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t(`value${n}Desc`)}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
