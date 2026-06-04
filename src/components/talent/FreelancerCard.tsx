"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import type { FreelancerWithProfile } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getInitials } from "@/lib/utils";

interface FreelancerCardProps {
  freelancer: FreelancerWithProfile;
  index?: number;
}

export function FreelancerCard({ freelancer, index = 0 }: FreelancerCardProps) {
  const profile = freelancer.freelancerProfile;
  if (!profile) return null;

  const cover = profile.portfolioItems[0]?.imageUrl;
  const minPrice = profile.servicePackages.reduce(
    (min, p) => (p.price < min ? p.price : min),
    profile.servicePackages[0]?.price ?? profile.hourlyRate ?? 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/freelancers/${freelancer.id}`}>
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm sm:flex-row"
        >
          <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted sm:aspect-square sm:w-44">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No preview
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/15 text-sm font-medium text-teal">
                  {getInitials(freelancer.name ?? "?")}
                </div>
                <div>
                  <h3 className="font-medium">{freelancer.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-sakura/15 px-2 py-0.5 text-sm">
                <Star className="h-3.5 w-3.5 fill-sakura text-sakura" />
                {profile.rating}
              </div>
            </div>
            {profile.location && (
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {profile.location}
              </p>
            )}
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {profile.tagline ?? freelancer.bio}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.skills.slice(0, 3).map((s) => (
                <Badge key={s} variant="outline" className="text-[10px]">
                  {s}
                </Badge>
              ))}
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-teal">
                From {formatCurrency(minPrice)}
              </span>
              {profile.isAvailable && (
                <span className="text-xs text-teal">Available</span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
