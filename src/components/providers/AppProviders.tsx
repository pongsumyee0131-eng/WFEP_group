"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./ThemeProvider";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AppProviders({ children }: { children: React.ReactNode }) {
  const content = <ThemeProvider>{children}</ThemeProvider>;

  if (!clerkKey) {
    return content;
  }

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      appearance={{
        variables: {
          colorPrimary: "#7eb8b3",
          colorBackground: "var(--background)",
          colorText: "var(--foreground)",
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
}
