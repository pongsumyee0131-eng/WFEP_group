import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Talent", href: "/talent" },
    { label: "Post a Project", href: "/projects/new" },
    { label: "How Escrow Works", href: "/#escrow" },
  ],
  Creatives: [
    { label: "Become a Freelancer", href: "/onboarding" },
    { label: "Portfolio Tips", href: "#" },
    { label: "Pricing Guide", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Trust & Safety", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 pattern-seigaiha">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/20">
                <Sparkles className="h-4 w-4 text-teal" />
              </span>
              <span className="font-serif text-xl font-semibold">
                Craft<span className="text-teal">Link</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A serene marketplace connecting creative professionals with clients who value
              craftsmanship, clarity, and trust.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CraftLink. Crafted with care.
          </p>
          <p className="text-xs text-muted-foreground font-serif italic">
            美は細部に宿る — Beauty lives in the details
          </p>
        </div>
      </div>
    </footer>
  );
}
