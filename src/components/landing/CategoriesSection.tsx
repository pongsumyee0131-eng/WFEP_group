"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, PenTool, Layers, Monitor } from "lucide-react";
import { CATEGORIES } from "@/types";

const categoryIcons: Record<string, React.ElementType> = {
  "Graphic Design": Palette,
  Illustration: PenTool,
  "Brand Design": Layers,
  "Web Design": Monitor,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function CategoriesSection() {
  const featured = CATEGORIES.slice(0, 4);

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
            Popular categories
          </h2>
          <p className="mt-3 text-muted-foreground">
            Curated talent across the creative disciplines you need most
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((cat) => {
            const Icon = categoryIcons[cat] ?? Palette;
            return (
              <motion.div key={cat} variants={item}>
                <Link href={`/talent?category=${encodeURIComponent(cat)}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-teal/40 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15 text-teal transition-colors group-hover:bg-teal/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-medium text-foreground">{cat}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Explore top-rated {cat.toLowerCase()} professionals
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
