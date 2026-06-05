"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EditorialHero } from "./EditorialHero";
import { ScrollReveal } from "./ScrollReveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Send } from "lucide-react";

function FloatingField({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      {children}
      <label
        htmlFor={id}
        className="absolute left-4 top-3 text-sm text-muted-foreground transition-all duration-300 pointer-events-none group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-teal peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-teal"
      >
        {label}
      </label>
    </div>
  );
}

export function ContactContent() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <>
      <EditorialHero badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="rounded-3xl border border-teal/30 bg-teal/5 p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring" }}
                  >
                    <CheckCircle className="h-16 w-16 text-teal mx-auto" />
                  </motion.div>
                  <h2 className="mt-6 font-serif text-2xl font-semibold">{t("successTitle")}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{t("successMessage")}</p>
                  <Link href="/" className="mt-8 inline-block text-sm text-teal hover:underline">
                    {t("successBack")}
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FloatingField id="name" label={t("nameLabel")}>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder=" "
                        className="peer w-full rounded-xl border border-input bg-background/80 px-4 pt-6 pb-2 text-sm outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/20 focus:shadow-[0_0_20px_rgba(126,184,179,0.15)]"
                      />
                    </FloatingField>
                    <FloatingField id="email" label={t("emailLabel")}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder=" "
                        className="peer w-full rounded-xl border border-input bg-background/80 px-4 pt-6 pb-2 text-sm outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/20 focus:shadow-[0_0_20px_rgba(126,184,179,0.15)]"
                      />
                    </FloatingField>
                  </div>
                  <FloatingField id="topic" label={t("topicLabel")}>
                    <select
                      id="topic"
                      name="topic"
                      className="peer w-full rounded-xl border border-input bg-background/80 px-4 pt-6 pb-2 text-sm outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/20 appearance-none"
                    >
                      <option value="support">{t("topicSupport")}</option>
                      <option value="partnership">{t("topicPartnership")}</option>
                      <option value="press">{t("topicPress")}</option>
                      <option value="other">{t("topicOther")}</option>
                    </select>
                  </FloatingField>
                  <FloatingField id="message" label={t("messageLabel")}>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder=" "
                      className="peer w-full rounded-xl border border-input bg-background/80 px-4 pt-6 pb-2 text-sm outline-none resize-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/20 focus:shadow-[0_0_20px_rgba(126,184,179,0.15)]"
                    />
                  </FloatingField>
                  <Button type="submit" variant="navy" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? t("sending") : t("submit")}
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="lg:col-span-2">
            <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8 h-full">
              <h3 className="font-medium">{t("officeTitle")}</h3>
              <p className="mt-3 text-muted-foreground">{t("officeHours")}</p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{t("officeNote")}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
