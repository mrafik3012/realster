import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Building2, CheckCircle2, Clock, PlusCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireAgent } from "@/lib/auth-guard";
import { getPropertiesForAgent } from "@/lib/data/properties";
import { formatPrice, LISTING_TYPE_LABELS, STATUS_LABELS } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardOverviewPage() {
  const agent = await requireAgent();
  const properties = await getPropertiesForAgent(agent.id);

  const active = properties.filter((p) => p.status === "ACTIVE").length;
  const pending = properties.filter((p) => p.status === "PENDING").length;
  const sold = properties.filter((p) => p.status === "SOLD").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Welcome back, {agent.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your listings.
          </p>
        </div>
        <Link href="/dashboard/properties/new" className={buttonVariants({ variant: "default" })}>
          <PlusCircle className="size-4" />
          Add a listing
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">{properties.length}</p>
            <p className="text-sm text-muted-foreground">Total listings</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">{active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="size-5" />
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">{pending + sold}</p>
            <p className="text-sm text-muted-foreground">Pending or sold</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent listings</h2>
          <Link href="/dashboard/properties" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="font-medium text-foreground">You haven&apos;t listed anything yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first property to see it appear here and on the public site.
            </p>
            <Link
              href="/dashboard/properties/new"
              className={buttonVariants({ variant: "default", className: "mt-4" })}
            >
              Add a listing
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {properties.slice(0, 5).map((property) => (
                <li key={property.id}>
                  <Link
                    href={`/properties/${property.slug}`}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {property.images[0] && (
                        <Image
                          src={property.images[0].url}
                          alt={property.images[0].alt}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">{property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.city}, {property.state} ·{" "}
                        {formatPrice(property.price, property.listingType)}
                      </p>
                    </div>
                    <Badge variant="outline">{STATUS_LABELS[property.status]}</Badge>
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      {LISTING_TYPE_LABELS[property.listingType]}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
