"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="opacity-0" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    document.documentElement.classList.add("transitioning");
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => document.documentElement.classList.remove("transitioning"), 500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative overflow-hidden"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? <Sun className="h-4 w-4 text-teal" /> : <Moon className="h-4 w-4 text-navy" />}
      </motion.div>
    </Button>
  );
}
