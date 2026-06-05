"use client";

import dynamic from "next/dynamic";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const OnboardingForm = dynamic(() => import("./OnboardingForm"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
    </div>
  ),
});

export default function OnboardingPage() {
  if (!clerkKey) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-serif text-2xl font-semibold">Configure Clerk</h1>
        <p className="mt-4 text-muted-foreground text-sm">
          Add Clerk API keys to <code className="text-teal">.env.local</code> to enable sign-up and
          role selection. You can still browse talent and demo orders without auth.
        </p>
      </div>
    );
  }
  return <OnboardingForm />;
}
