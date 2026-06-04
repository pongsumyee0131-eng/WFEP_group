"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileText, ArrowRight } from "lucide-react";
import { getMockFreelancer, MOCK_FREELANCERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

function NewOrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const freelancerId = searchParams.get("freelancer") ?? MOCK_FREELANCERS[0].id;
  const packageId = searchParams.get("package");

  const freelancer = getMockFreelancer(freelancerId);
  const profile = freelancer?.freelancerProfile;
  const selectedPackage = packageId
    ? profile?.servicePackages.find((p) => p.id === packageId)
    : null;

  const [title, setTitle] = useState(selectedPackage?.title ?? "");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState(String(selectedPackage?.price ?? ""));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          freelancerId,
          servicePackageId: packageId,
          title,
          brief,
          budget: parseFloat(budget),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push(`/orders/${data.order.id}`), 1200);
      } else {
        // Demo mode: navigate with mock order id
        router.push(`/orders/demo-order?freelancer=${freelancerId}`);
      }
    } catch {
      router.push(`/orders/demo-order?freelancer=${freelancerId}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-24"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          className="h-16 w-16 rounded-full bg-teal/20 flex items-center justify-center"
        >
          <span className="text-2xl">✓</span>
        </motion.div>
        <p className="mt-4 font-serif text-xl">Order placed — funds in escrow</p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-semibold">Project brief</h1>
        <p className="mt-2 text-muted-foreground">
          Working with {freelancer?.name ?? "your selected freelancer"}
          {selectedPackage && ` · ${selectedPackage.title}`}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-teal" />
              Project details
            </CardTitle>
            <CardDescription>
              Be specific — this becomes the contract for milestone delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1.5"
                placeholder="e.g. Brand identity for tea shop"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Detailed brief</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                required
                rows={6}
                className="mt-1.5 w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-ring outline-none"
                placeholder="Goals, audience, style references, deliverables, timeline..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Budget (USD)</label>
              <Input
                type="number"
                min={50}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className="mt-1.5"
              />
              {selectedPackage && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Package price: {formatCurrency(selectedPackage.price)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4 text-teal" />
              Attachments
            </CardTitle>
            <CardDescription>Reference files, brand assets, wireframes (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-10 transition-colors hover:border-teal/50 hover:bg-teal/5">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="mt-2 text-sm text-muted-foreground">
                Drop files or click to upload
              </span>
              <input type="file" className="hidden" multiple disabled />
              <span className="mt-1 text-xs text-muted-foreground">
                Configure Cloudinary to enable uploads
              </span>
            </label>
          </CardContent>
        </Card>

        <Card className="bg-teal/5 border-teal/20">
          <CardContent className="pt-6">
            <p className="text-sm">
              <strong>Escrow:</strong> Your full budget will be held securely. Funds release per
              milestone (Concept 30% · Draft 40% · Final 30%) after your approval.
            </p>
          </CardContent>
        </Card>

        <Button type="submit" variant="navy" size="lg" className="w-full group" disabled={loading}>
          {loading ? "Processing payment to escrow..." : "Pay into Escrow & Place Order"}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </div>
  );
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <NewOrderForm />
    </Suspense>
  );
}
