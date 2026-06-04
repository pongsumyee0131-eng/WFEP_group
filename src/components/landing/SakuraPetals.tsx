"use client";

import { motion } from "framer-motion";

export function SakuraPetals({ count = 8 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${10 + (i * 7) % 80}%`,
    delay: i * 0.4,
    duration: 8 + (i % 4) * 2,
    size: 6 + (i % 3) * 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sakura/40"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.2,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
