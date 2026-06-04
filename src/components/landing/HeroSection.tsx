"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Search, PenLine, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SakuraPetals } from "./SakuraPetals";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/talent?q=${encodeURIComponent(q)}` : "/talent");
  };

  return (
    <section className="relative overflow-hidden gradient-hero pattern-seigaiha">
      <SakuraPetals count={12} />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
              Premium creative marketplace
            </motion.p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Where craft meets{" "}
              <span className="text-teal">connection</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Discover exceptional graphic designers, illustrators, and brand artists.
              Secure escrow, milestone payments, and serene collaboration — all in one place.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search designers, skills, or style..."
                  className="h-12 pl-11 rounded-full bg-card/90 shadow-sm"
                />
              </div>
              <Button type="submit" variant="default" size="lg" className="shrink-0">
                Search
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/talent">
                <Button variant="navy" size="lg" className="group">
                  <Users className="h-4 w-4" />
                  Find Talent
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/projects/new">
                <Button variant="outline" size="lg" className="group bg-card/80">
                  <PenLine className="h-4 w-4" />
                  Post a Project
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/20 via-sakura/15 to-beige/30 border border-border/40 shadow-2xl"
              />
              <svg
                viewBox="0 0 400 400"
                className="relative z-10 w-full h-full p-8"
                aria-hidden
              >
                <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal/30" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-sakura/40" />
                <path
                  d="M200 80 Q280 200 200 320 Q120 200 200 80"
                  fill="currentColor"
                  className="text-teal/15"
                />
                <circle cx="200" cy="160" r="24" fill="currentColor" className="text-sakura/60" />
                <path
                  d="M140 240 Q200 280 260 240"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-navy/40 dark:text-foreground/30"
                />
                <text x="200" y="360" textAnchor="middle" className="fill-muted-foreground text-[11px] font-serif">
                  匠 — Takumi
                </text>
              </svg>
              <motion.div
                className="absolute -right-4 top-1/4 rounded-2xl border border-border/60 bg-card p-4 shadow-lg"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <p className="text-xs text-muted-foreground">Escrow protected</p>
                <p className="font-semibold text-teal">$12,400 released</p>
              </motion.div>
              <motion.div
                className="absolute -left-2 bottom-1/4 rounded-2xl border border-border/60 bg-card p-4 shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <p className="text-xs text-muted-foreground">Milestone approved</p>
                <p className="font-semibold text-sakura-foreground">Draft → Final</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
