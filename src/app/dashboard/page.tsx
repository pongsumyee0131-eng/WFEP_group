"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createDemoOrder } from "@/lib/demo-order";
import { formatCurrency } from "@/lib/utils";

const demoOrder = createDemoOrder();

const stats = [
  { label: "Active projects", value: "2", icon: Briefcase },
  { label: "In escrow", value: formatCurrency(1840), icon: DollarSign },
  { label: "Awaiting review", value: "1", icon: Clock },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Track orders, earnings, and active collaborations
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
                <s.icon className="h-4 w-4 text-teal" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{s.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold mb-4">Recent orders</h2>
        <motion.div whileHover={{ x: 4 }}>
          <Link href="/orders/demo-order">
            <Card className="hover:border-teal/40 transition-colors">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs text-muted-foreground">{demoOrder.orderNumber}</p>
                  <p className="font-medium mt-1">{demoOrder.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {demoOrder.freelancer.name} · {formatCurrency(demoOrder.budget)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-teal text-sm">
                  View <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/talent">
          <Button variant="outline">Find Talent</Button>
        </Link>
        <Link href="/projects/new">
          <Button variant="navy">Post a Project</Button>
        </Link>
        <Link href="/messages">
          <Button variant="ghost">Messages</Button>
        </Link>
      </div>
    </div>
  );
}
