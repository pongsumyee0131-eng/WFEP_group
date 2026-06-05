"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { EditorialHero } from "./EditorialHero";
import { ScrollReveal } from "./ScrollReveal";
import { formatCurrency } from "@/lib/utils";
import { Clock, TrendingUp } from "lucide-react";

const FREELANCER_FEE = 0.1;
const CLIENT_FEE = 0.05;

export function PricingGuideContent() {
  const t = useTranslations("pricingGuide");
  const [value, setValue] = useState(1200);
  const motionValue = useMotionValue(1200);
  const earnings = useTransform(motionValue, (v) => Math.round(v * (1 - FREELANCER_FEE)));
  const clientPays = useTransform(motionValue, (v) => Math.round(v * (1 + CLIENT_FEE)));
  const [displayEarnings, setDisplayEarnings] = useState(1080);
  const [displayClient, setDisplayClient] = useState(1260);

  useEffect(() => {
    const unsub1 = earnings.on("change", (v) => setDisplayEarnings(Math.round(v)));
    const unsub2 = clientPays.on("change", (v) => setDisplayClient(Math.round(v)));
    return () => {
      unsub1();
      unsub2();
    };
  }, [earnings, clientPays]);

  const onSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setValue(v);
    animate(motionValue, v, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
  };

  const fees = [
    { label: t("feeClient"), value: t("feeClientValue"), note: t("feeClientNote") },
    { label: t("feeFreelancer"), value: t("feeFreelancerValue"), note: t("feeFreelancerNote") },
    { label: t("feeEscrow"), value: t("feeEscrowValue"), note: t("feeEscrowNote") },
  ];

  return (
    <>
      <EditorialHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-serif text-2xl font-semibold">{t("modelsTitle")}</h2>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-border/60 bg-card p-8">
              <Clock className="h-8 w-8 text-teal mb-4" />
              <h3 className="font-serif text-xl font-semibold">{t("hourlyTitle")}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t("hourlyDesc")}</p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="text-teal">+ {t("hourlyPros")}</li>
                <li className="text-muted-foreground">− {t("hourlyCons")}</li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-sakura/30 bg-sakura/5 p-8">
              <TrendingUp className="h-8 w-8 text-sakura-foreground mb-4" />
              <h3 className="font-serif text-xl font-semibold">{t("valueTitle")}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t("valueDesc")}</p>
              <ul className="mt-6 space-y-2 text-sm">
                <li className="text-teal">+ {t("valuePros")}</li>
                <li className="text-muted-foreground">− {t("valueCons")}</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-secondary/20 py-20 border-y border-border/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-serif text-2xl font-semibold">{t("feesTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("feesSubtitle")}</p>
          </ScrollReveal>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-6 py-4 text-left font-medium"> </th>
                  <th className="px-6 py-4 text-left font-medium">Rate</th>
                  <th className="px-6 py-4 text-left font-medium hidden sm:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row, i) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-border/30 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium">{row.label}</td>
                    <td className="px-6 py-4 text-teal font-semibold">{row.value}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <ScrollReveal>
          <h2 className="font-serif text-2xl font-semibold text-center">{t("calculatorTitle")}</h2>
          <p className="mt-2 text-center text-muted-foreground text-sm">{t("calculatorSubtitle")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/10 to-card p-8 shadow-sm">
            <label className="text-sm font-medium">{t("projectValue")}</label>
            <input
              type="range"
              min={200}
              max={10000}
              step={50}
              value={value}
              onChange={onSlider}
              className="mt-4 w-full accent-teal"
            />
            <motion.p
              key={value}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 text-center font-serif text-4xl font-semibold text-teal"
            >
              {formatCurrency(value)}
            </motion.p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-card/80 border border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">{t("yourEarnings")}</p>
                <p className="mt-1 text-2xl font-semibold">{formatCurrency(displayEarnings)}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{t("afterFees")}</p>
              </div>
              <div className="rounded-xl bg-card/80 border border-border/50 p-4 text-center">
                <p className="text-xs text-muted-foreground">{t("clientPays")}</p>
                <p className="mt-1 text-2xl font-semibold">{formatCurrency(displayClient)}</p>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">{t("milestonesNote")}</p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
