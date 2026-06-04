"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function ClerkAuthButtons() {
  return (
    <>
      <SignedOut>
        <Link href="/sign-in" className="hidden sm:block">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="sakura" size="sm">
            Get Started
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: "h-9 w-9 ring-2 ring-teal/30" },
          }}
        />
      </SignedIn>
    </>
  );
}
