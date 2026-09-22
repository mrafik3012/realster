import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageCircle, Users } from "lucide-react";
import { PropertySearchBar } from "@/components/property-search-bar";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties, getDistinctCities } from "@/lib/data/properties";

export default async function HomePage() {
  const [featured, cities] = await Promise.all([
    getFeaturedProperties(6),
    getDistinctCities(),
  ]);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero-main.jpg"
          alt="Modern house with a pool at dusk"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/40 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
              Buy · Rent · List with a licensed agent
            </span>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Find your next property, faster.
            </h1>
            <p className="max-w-xl text-base text-white/80 sm:text-lg">
              Realster connects buyers and renters directly with the licensed
              agents managing each listing — no lead forms disappearing into a
              call center. Search the market or list a property in minutes.
            </p>
          </div>

          <div className="max-w-3xl">
            <PropertySearchBar />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 sm:grid-cols-3 lg:px-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Agent-verified listings
              </h3>
              <p className="text-sm text-muted-foreground">
                Every listing is entered and maintained by the licensed agent
                representing it — not scraped from somewhere else.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Talk to the listing agent
              </h3>
              <p className="text-sm text-muted-foreground">
                Every property page shows the actual agent managing it, with
                a direct phone number and email.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Built for agents, too
              </h3>
              <p className="text-sm text-muted-foreground">
                Agents get a login, a dashboard, and full control over their
                own listings — photos, pricing, and status included.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Featured properties
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A mix of what&apos;s new and what agents have flagged this
              week.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all properties
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No featured properties right now. Check back soon, or{" "}
            <Link href="/properties" className="text-primary hover:underline">
              browse everything on the market
            </Link>
            .
          </div>
        )}
      </section>

      {cities.length > 0 && (
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
              Browse by city
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.city}
                  href={`/properties?city=${encodeURIComponent(c.city)}`}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {c.city}, {c.state}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-secondary px-6 py-12 text-center text-secondary-foreground sm:px-12">
          <h2 className="max-w-xl font-heading text-2xl font-bold sm:text-3xl">
            Licensed agent? List your properties on Realster.
          </h2>
          <p className="max-w-lg text-secondary-foreground/75">
            Create a free agent account, add your license details, and start
            publishing listings with photos, pricing, and availability status
            in minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register" className="inline-flex">
              <Button size="lg" variant="default">
                Create agent account
              </Button>
            </Link>
            <Link href="/login" className="inline-flex">
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                Agent login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
