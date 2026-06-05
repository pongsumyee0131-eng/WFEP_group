"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Palette, PenTool, Layers, Monitor } from "lucide-react";

const categoryKeys = [
  { key: "graphicDesign", icon: Palette },
  { key: "illustration", icon: PenTool },
  { key: "brandDesign", icon: Layers },
  { key: "webDesign", icon: Monitor },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function CategoriesSection() {
  const t = useTranslations("landing");
  const tc = useTranslations("categories");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-semibold text-foreground">
            {t("categoriesTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("categoriesSubtitle")}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categoryKeys.map(({ key, icon: Icon }) => {
            const label = tc(key);
            return (
              <motion.div key={key} variants={item}>
                <Link href={{ pathname: "/talent", query: { category: label } }}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-teal/40 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15 text-teal transition-colors group-hover:bg-teal/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-medium text-foreground">{label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("exploreCategory", { category: label })}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
