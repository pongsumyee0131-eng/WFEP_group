"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const ClerkAuth = clerkKey
  ? dynamic(() => import("./ClerkAuthButtons").then((m) => m.ClerkAuthButtons), {
      ssr: false,
    })
  : null;

export function AuthButtons() {
  if (!ClerkAuth) {
    return (
      <>
        <Link href="/sign-in" className="hidden sm:block">
          <span className="inline-flex h-8 items-center rounded-full px-4 text-sm hover:bg-accent">
            Sign in
          </span>
        </Link>
        <Link href="/sign-up">
          <span className="inline-flex h-8 items-center rounded-full bg-sakura px-4 text-sm text-sakura-foreground">
            Get Started
          </span>
        </Link>
      </>
    );
  }
  return <ClerkAuth />;
}
