"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, POPULAR_SKILLS } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TalentFiltersProps {
  query: string;
  category: string;
  skill: string;
  onQueryChange: (q: string) => void;
  onCategoryChange: (c: string) => void;
  onSkillChange: (s: string) => void;
}

export function TalentFilters({
  query,
  category,
  skill,
  onQueryChange,
  onCategoryChange,
  onSkillChange,
}: TalentFiltersProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        <SlidersHorizontal className="h-4 w-4 text-teal" />
        Filters
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search name, skill..."
          className="pl-9 rounded-xl"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={category === "" ? "teal" : "outline"}
            className="cursor-pointer"
            onClick={() => onCategoryChange("")}
          >
            All
          </Badge>
          {CATEGORIES.map((c) => (
            <Badge
              key={c}
              variant={category === c ? "teal" : "outline"}
              className={cn("cursor-pointer transition-colors")}
              onClick={() => onCategoryChange(category === c ? "" : c)}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILLS.map((s) => (
            <Badge
              key={s}
              variant={skill === s ? "sakura" : "outline"}
              className="cursor-pointer text-[10px]"
              onClick={() => onSkillChange(skill === s ? "" : s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
