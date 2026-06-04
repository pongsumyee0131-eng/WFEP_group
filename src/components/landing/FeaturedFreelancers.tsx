"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getInitials } from "@/lib/utils";

export function FeaturedFreelancers() {
  const featured = MOCK_FREELANCERS.slice(0, 3);

  return (
    <section className="py-16 border-y border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Featured talent</h2>
            <p className="mt-2 text-muted-foreground">Handpicked creatives ready for your next project</p>
          </div>
          <Link
            href="/talent"
            className="hidden sm:flex items-center gap-1 text-sm text-teal hover:gap-2 transition-all"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((f, i) => {
            const profile = f.freelancerProfile!;
            const cover = profile.portfolioItems[0]?.imageUrl;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/freelancers/${f.id}`}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-medium text-teal">
                          {getInitials(f.name ?? "CL")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium truncate">{f.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{profile.title}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-sakura text-sakura" />
                          {profile.rating}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {profile.skills.slice(0, 2).map((s) => (
                          <Badge key={s} variant="teal" className="text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-teal font-medium">
                        From {formatCurrency(profile.servicePackages[0]?.price ?? profile.hourlyRate ?? 0)}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
