"use client";

import { SignIn } from "@clerk/nextjs";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function SignInClient() {
  if (!clerkKey) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-muted-foreground text-sm">Configure Clerk to enable sign-in.</p>
      </div>
    );
  }
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16 pattern-seigaiha">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl border border-border/60 rounded-2xl",
          },
        }}
      />
    </div>
  );
}
