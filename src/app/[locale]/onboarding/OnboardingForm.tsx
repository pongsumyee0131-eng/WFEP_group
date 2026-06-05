"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Briefcase, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingForm() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const selectRole = async (role: "FREELANCER" | "CLIENT") => {
    setLoading(role);
    try {
      const res = await fetch("/api/user/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        router.push(role === "FREELANCER" ? "/dashboard/freelancer/setup" : "/dashboard");
      }
    } finally {
      setLoading(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-teal border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="font-serif text-3xl font-semibold">Welcome to CraftLink</h1>
        <p className="mt-3 text-muted-foreground">
          How would you like to use the platform?
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="cursor-pointer border-2 border-transparent hover:border-teal/40 transition-colors h-full"
            onClick={() => selectRole("CLIENT")}
          >
            <CardHeader>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/15">
                <UserCircle className="h-7 w-7 text-teal" />
              </div>
              <CardTitle className="font-serif">I need design work</CardTitle>
              <CardDescription>
                Hire freelancers, post projects, and manage orders with escrow protection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="navy" className="w-full" disabled={loading !== null}>
                {loading === "CLIENT" ? "Setting up..." : "Continue as Client"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="cursor-pointer border-2 border-transparent hover:border-sakura/40 transition-colors h-full"
            onClick={() => selectRole("FREELANCER")}
          >
            <CardHeader>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sakura/20">
                <Briefcase className="h-7 w-7 text-sakura-foreground" />
              </div>
              <CardTitle className="font-serif">I am a creative</CardTitle>
              <CardDescription>
                Showcase your portfolio, offer services, and earn through milestone payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="sakura" className="w-full" disabled={loading !== null}>
                {loading === "FREELANCER" ? "Setting up..." : "Continue as Freelancer"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
