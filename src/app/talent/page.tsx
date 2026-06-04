"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { FreelancerCard } from "@/components/talent/FreelancerCard";
import { TalentFilters } from "@/components/talent/TalentFilters";

function TalentContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [skill, setSkill] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return MOCK_FREELANCERS.filter((f) => {
      const p = f.freelancerProfile;
      if (!p) return false;
      if (category && !p.categories.includes(category)) return false;
      if (skill && !p.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())))
        return false;
      if (!q) return true;
      return (
        f.name?.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q)) ||
        p.tagline?.toLowerCase().includes(q)
      );
    });
  }, [query, category, skill]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Discover talent</h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} creative{filtered.length !== 1 ? "s" : ""} ready to collaborate
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <TalentFilters
          query={query}
          category={category}
          skill={skill}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSkillChange={setSkill}
        />
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground">
              No freelancers match your filters. Try adjusting your search.
            </p>
          ) : (
            filtered.map((f, i) => (
              <FreelancerCard key={f.id} freelancer={f} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function TalentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
        </div>
      }
    >
      <TalentContent />
    </Suspense>
  );
}
