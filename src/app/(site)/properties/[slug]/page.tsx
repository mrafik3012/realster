import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  LandPlot,
  MapPin,
  Calendar,
  Phone,
  Mail,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertyCard } from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  formatArea,
  formatPrice,
  initials,
  isLandType,
  LISTING_TYPE_LABELS,
  PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
} from "@/lib/utils";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/data/properties";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description.slice(0, 155),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const similar = await getSimilarProperties(property.id, property.city, property.propertyType);
  const amenities = property.amenities
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const mailtoHref = `mailto:${property.agent.email}?subject=${encodeURIComponent(
    `Inquiry about ${property.title}`
  )}&body=${encodeURIComponent(
    `Hi ${property.agent.name.split(" ")[0]},\n\nI'm interested in ${property.title} at ${property.address}, ${property.city}, ${property.state}. Could you share more details or set up a time to see it?\n\nThanks!`
  )}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/properties"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to properties
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <PropertyGallery images={property.images} />

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{LISTING_TYPE_LABELS[property.listingType]}</Badge>
              <Badge variant="outline">{PROPERTY_TYPE_LABELS[property.propertyType]}</Badge>
              {property.status !== "ACTIVE" && (
                <Badge variant="outline">{STATUS_LABELS[property.status]}</Badge>
              )}
              {property.featured && <Badge>Featured</Badge>}
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <LandPlot className="size-5 text-primary" />
              <div>
                <p className="font-heading text-lg font-semibold leading-tight">
                  {formatArea(property.areaSqft, property.areaUnit)}
                </p>
                <p className="text-xs text-muted-foreground">Extent</p>
              </div>
            </div>
            {!isLandType(property.propertyType) && property.bedrooms != null && (
              <div className="flex items-center gap-2">
                <Bed className="size-5 text-primary" />
                <div>
                  <p className="font-heading text-lg font-semibold leading-tight">{property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
              </div>
            )}
            {!isLandType(property.propertyType) && property.bathrooms != null && (
              <div className="flex items-center gap-2">
                <Bath className="size-5 text-primary" />
                <div>
                  <p className="font-heading text-lg font-semibold leading-tight">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
              </div>
            )}
            {property.yearBuilt && (
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-primary" />
                <div>
                  <p className="font-heading text-lg font-semibold leading-tight">{property.yearBuilt}</p>
                  <p className="text-xs text-muted-foreground">Year built</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-2 font-heading text-lg font-semibold text-foreground">
              About this listing
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-foreground/90">
              {property.description}
            </p>
          </div>

          {amenities.length > 0 && (
            <div>
              <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                Features &amp; amenities
              </h2>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-1.5 text-sm text-foreground/90"
                  >
                    <BadgeCheck className="size-4 shrink-0 text-primary" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="font-heading text-2xl font-bold text-foreground">
              {formatPrice(property.price, property.listingType)}
            </p>
            <p className="text-sm text-muted-foreground">
              {LISTING_TYPE_LABELS[property.listingType]} · {PROPERTY_TYPE_LABELS[property.propertyType]}
            </p>

            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
              <Link
                href={`/agents/${property.agent.id}`}
                className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-muted"
              >
                <Avatar className="size-11">
                  <AvatarFallback className="bg-primary text-sm text-primary-foreground">
                    {initials(property.agent.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{property.agent.name}</p>
                  <p className="text-xs text-muted-foreground">{property.agent.title}</p>
                </div>
              </Link>

              <Button render={<a href={`tel:${property.agent.phone.replace(/[^\d+]/g, "")}`} />} className="gap-2">
                <Phone className="size-4" />
                {property.agent.phone}
              </Button>
              <Button variant="outline" render={<a href={mailtoHref} />} className="gap-2">
                <Mail className="size-4" />
                Email agent
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/40 p-5 text-xs text-muted-foreground">
            License #{property.agent.licenseNo} · Coimbatore listing on a demo
            Realster platform.
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
            Similar listings
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
