import Link from "next/link";
import { ArrowRight, LandPlot, ScrollText, Users } from "lucide-react";
import { PropertySearchBar } from "@/components/property-search-bar";
import { PropertyCard } from "@/components/property-card";
import { HeroVideo } from "@/components/hero-video";
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
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/40 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
              Coimbatore · Tamil Nadu · Land first
            </span>
            <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Land in Coimbatore, listed by the agent who holds it.
            </h1>
            <p className="max-w-xl text-base text-white/80 sm:text-lg">
              Plots, coconut groves, farm parcels, and industrial sites from
              Pollachi to Mettupalayam. Search by locality — or list the
              survey number you already know.
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
            <LandPlot className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Land is the book of business
              </h3>
              <p className="text-sm text-muted-foreground">
                Residential plots, agricultural land, farms, and industrial
                parcels — houses appear only when an owner already sold land
                through us.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ScrollText className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Patta, FMB, and frontage
              </h3>
              <p className="text-sm text-muted-foreground">
                Listings carry what Coimbatore buyers actually ask for: survey
                numbers, road width, water, and whether DTCP or LPA approval
                is in place.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Talk to the listing agent
              </h3>
              <p className="text-sm text-muted-foreground">
                Each parcel is managed by a licensed agent in Coimbatore —
                call or email them from the listing, no routed lead form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Featured land
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              What agents around Coimbatore have flagged this week.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all listings
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
            No featured land right now.{" "}
            <Link href="/properties" className="text-primary hover:underline">
              Browse every parcel on the market
            </Link>
            .
          </div>
        )}
      </section>

      {cities.length > 0 && (
        <section className="survey-grid border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
              Browse by locality
            </h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.city}
                  href={`/properties?city=${encodeURIComponent(c.city)}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {c.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-secondary px-6 py-12 text-center text-secondary-foreground sm:px-12">
          <h2 className="max-w-xl font-heading text-2xl font-bold sm:text-3xl">
            Licensed in Tamil Nadu? List your land on Realster.
          </h2>
          <p className="max-w-lg text-secondary-foreground/75">
            Create a free agent account, add your RERA number, and publish
            plots and farms with photos, extent, and status in minutes.
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
