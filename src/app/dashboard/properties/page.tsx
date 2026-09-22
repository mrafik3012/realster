import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Pencil, PlusCircle, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeletePropertyButton } from "@/components/delete-property-button";
import { requireAgent } from "@/lib/auth-guard";
import { getPropertiesForAgent } from "@/lib/data/properties";
import { formatPrice, LISTING_TYPE_LABELS, PROPERTY_TYPE_LABELS, STATUS_LABELS } from "@/lib/utils";

export const metadata: Metadata = { title: "My listings" };

export default async function DashboardPropertiesPage() {
  const agent = await requireAgent();
  const properties = await getPropertiesForAgent(agent.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">My listings</h1>
          <p className="text-sm text-muted-foreground">
            {properties.length} {properties.length === 1 ? "listing" : "listings"} total
          </p>
        </div>
        <Link href="/dashboard/properties/new" className={buttonVariants({ variant: "default" })}>
          <PlusCircle className="size-4" />
          Add a listing
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-medium text-foreground">No listings yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first property and it will show up here and on the public site.
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
            {properties.map((property) => (
              <li key={property.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {property.images[0] && (
                    <Image
                      src={property.images[0].url}
                      alt={property.images[0].alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.city}, {property.state} · {formatPrice(property.price, property.listingType)}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge variant="outline">{STATUS_LABELS[property.status]}</Badge>
                    <Badge variant="secondary">{LISTING_TYPE_LABELS[property.listingType]}</Badge>
                    <Badge variant="outline">{PROPERTY_TYPE_LABELS[property.propertyType]}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/properties/${property.slug}`}
                    target="_blank"
                    className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                    aria-label="View public listing"
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                  <Link
                    href={`/dashboard/properties/${property.id}/edit`}
                    className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                    aria-label="Edit listing"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <DeletePropertyButton propertyId={property.id} title={property.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
