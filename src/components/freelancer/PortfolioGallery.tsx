"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { PortfolioItem } from "@prisma/client";
import { cn } from "@/lib/utils";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + sorted.length) % sorted.length);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightbox(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-muted text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-medium text-sm">{item.title}</p>
              {item.category && (
                <p className="text-white/70 text-xs">{item.category}</p>
              )}
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-card/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4 text-foreground" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && sorted[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full bg-card/20 p-2 text-white hover:bg-card/40"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/20 p-3 text-white"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sorted[lightbox].imageUrl}
                alt={sorted[lightbox].title}
                className="max-h-[75vh] w-auto rounded-xl object-contain mx-auto"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="font-serif text-xl">{sorted[lightbox].title}</h3>
                {sorted[lightbox].description && (
                  <p className="mt-1 text-white/70 text-sm">{sorted[lightbox].description}</p>
                )}
              </div>
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/20 p-3 text-white"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {sorted.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === lightbox ? "w-6 bg-teal" : "w-1.5 bg-white/40"
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
