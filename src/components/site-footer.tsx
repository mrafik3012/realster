import Link from "next/link";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Land",
    links: [
      { href: "/properties?propertyType=PLOT", label: "Residential plots" },
      { href: "/properties?propertyType=AGRICULTURAL", label: "Agricultural land" },
      { href: "/properties?propertyType=FARM", label: "Farm land" },
      { href: "/properties?propertyType=INDUSTRIAL", label: "Industrial land" },
    ],
  },
  {
    title: "Realster",
    links: [
      { href: "/about", label: "About us" },
      { href: "/agents", label: "Find an agent" },
      { href: "/contact", label: "Contact" },
      { href: "/register", label: "List your land" },
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
              Coimbatore land marketplace. Plots, farms, agricultural and
              industrial parcels — listed by licensed agents, not scraped
              from somewhere else.
            </p>
            <p className="text-sm text-secondary-foreground/60">
              Coimbatore, Tamil Nadu
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
          <p>© {new Date().getFullYear()} Realster, Coimbatore. All rights reserved.</p>
          <p>Demo listings. Agents and parcels are fictional.</p>
        </div>
      </div>
    </footer>
  );
}
