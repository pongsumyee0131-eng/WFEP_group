"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DualAudienceSection() {
  const t = useTranslations("landing");

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
              {t("forClients")}
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold">{t("clientsTitle")}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("clientsDesc")}</p>
            <Link href="/projects/new" className="mt-6 inline-block">
              <Button variant="navy" size="lg">
                {t("postProject")}
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
              {t("forFreelancers")}
            </span>
            <h3 className="mt-3 font-serif text-2xl font-semibold">{t("freelancersTitle")}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("freelancersDesc")}</p>
            <Link href="/onboarding" className="mt-6 inline-block">
              <Button variant="sakura" size="lg">
                {t("joinFreelancer")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
