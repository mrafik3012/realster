import Link from "next/link";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/properties?listingType=SALE", label: "Homes for sale" },
      { href: "/properties?listingType=RENT", label: "Homes for rent" },
      { href: "/properties?propertyType=CONDO", label: "Condos" },
      { href: "/agents", label: "Find an agent" },
    ],
  },
  {
    title: "Realster",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/register", label: "List a property" },
      { href: "/login", label: "Agent login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-3">
            <Logo dark />
            <p className="max-w-sm text-sm text-secondary-foreground/70">
              A property marketplace connecting buyers, renters, and licensed
              agents. List a property, browse the market, or find an agent
              who knows the neighborhood.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary-foreground/60">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary-foreground/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-secondary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Realster. All rights reserved.</p>
          <p>This is a demo application. Listings and agents are fictional.</p>
        </div>
      </div>
    </footer>
  );
}
