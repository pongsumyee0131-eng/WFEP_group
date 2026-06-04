"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, MessageCircle, Shield } from "lucide-react";
import type { FreelancerWithProfile } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "./PortfolioGallery";
import { ServicePackages } from "./ServicePackages";
import { formatCurrency, getInitials } from "@/lib/utils";

interface FreelancerProfileViewProps {
  freelancer: FreelancerWithProfile;
}

export function FreelancerProfileView({ freelancer }: FreelancerProfileViewProps) {
  const profile = freelancer.freelancerProfile!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border/60 bg-card p-8 lg:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/30 to-sakura/20 text-2xl font-medium text-teal">
              {getInitials(freelancer.name ?? "?")}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-semibold">{freelancer.name}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{profile.title}</p>
              {profile.tagline && (
                <p className="mt-2 text-sm italic text-muted-foreground">{profile.tagline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-sakura text-sakura" />
                  {profile.rating} ({profile.reviewCount} reviews)
                </span>
                {profile.location && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </span>
                )}
                <span className="text-muted-foreground">
                  {profile.totalOrders} orders completed
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <Badge key={s} variant="teal">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col shrink-0">
            <Link href={`/orders/new?freelancer=${freelancer.id}`}>
              <Button variant="navy" size="lg" className="w-full sm:w-auto">
                Request Custom Project
              </Button>
            </Link>
            <Link href={`/messages?with=${freelancer.id}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
            </Link>
          </div>
        </div>

        {profile.revisionPolicy && (
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-secondary/50 p-4 text-sm">
            <Shield className="h-4 w-4 text-teal shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Revision policy</p>
              <p className="text-muted-foreground">{profile.revisionPolicy}</p>
              {profile.responseTime && (
                <p className="text-muted-foreground mt-1">Response time: {profile.responseTime}</p>
              )}
            </div>
          </div>
        )}
      </motion.div>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold mb-6">Portfolio</h2>
        <PortfolioGallery items={profile.portfolioItems} />
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold mb-2">Services</h2>
        <p className="text-muted-foreground mb-8">
          Packages include milestone-based delivery with escrow protection
        </p>
        <ServicePackages packages={profile.servicePackages} freelancerId={freelancer.id} />
      </section>

      {profile.hourlyRate && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Custom projects from {formatCurrency(profile.hourlyRate)}/hr equivalent
        </p>
      )}
    </div>
  );
}
