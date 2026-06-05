"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { ServicePackage } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ServicePackagesProps {
  packages: ServicePackage[];
  freelancerId: string;
}

export function ServicePackages({ packages, freelancerId }: ServicePackagesProps) {
  const active = packages.filter((p) => p.isActive);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {active.map((pkg, i) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4 }}
        >
          <Card className="h-full border-border/60 hover:border-teal/30 transition-colors">
            <CardHeader>
              <CardTitle className="font-serif">{pkg.title}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-semibold text-teal">{formatCurrency(pkg.price)}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {pkg.deliveryDays} day delivery · {pkg.revisions} revisions
              </p>
              <ul className="space-y-2">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-teal shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/orders/new?freelancer=${freelancerId}&package=${pkg.id}`}>
                <Button variant="navy" className="w-full mt-2">
                  Order — {formatCurrency(pkg.price)}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
